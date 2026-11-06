/**
 * HTML5 Audio Engine for local MP3 playback
 * Provides a single shared playback state between the header button,
 * floating player, and main music section.
 */

type AudioListener = (state: {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrackIndex: number;
}) => void;

class RealMusicEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private volume: number = 0.8;
  private listeners: Set<AudioListener> = new Set();
  private playlist: Array<{ audioUrl: string; durationSec?: number }> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      this.audio.volume = this.volume;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('timeupdate', () => {
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.playNext();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio playback error on track:', this.currentTrackIndex, e);
        this.isPlaying = false;
        this.notify();
      });
    }
  }

  public setPlaylist(tracks: Array<{ audioUrl: string; durationSec?: number }>) {
    this.playlist = tracks;
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    // Send immediate initial state
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      currentTime: this.audio ? this.audio.currentTime : 0,
      duration: this.audio && !isNaN(this.audio.duration) && this.audio.duration > 0
        ? this.audio.duration
        : (this.playlist[this.currentTrackIndex]?.durationSec || 180),
      currentTrackIndex: this.currentTrackIndex,
    };
  }

  public playTrack(index: number, autoPlay: boolean = true) {
    if (!this.audio || this.playlist.length === 0) return;

    const safeIndex = (index + this.playlist.length) % this.playlist.length;
    const track = this.playlist[safeIndex];
    if (!track) return;

    this.currentTrackIndex = safeIndex;

    const currentSrc = this.audio.getAttribute('src');
    if (currentSrc !== track.audioUrl) {
      this.audio.src = track.audioUrl;
      this.audio.currentTime = 0;
    }

    if (autoPlay) {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            console.warn('Playback prevented by browser autoplay policy:', err);
            this.isPlaying = false;
            this.notify();
          });
      }
    } else {
      this.notify();
    }
  }

  public togglePlay(fallbackIndex: number = 0) {
    if (!this.audio) return;

    if (!this.audio.src && this.playlist.length > 0) {
      this.playTrack(fallbackIndex, true);
      return;
    }

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            console.warn('Playback error:', err);
          });
      }
    }
  }

  public pause() {
    if (this.audio && this.isPlaying) {
      this.audio.pause();
    }
  }

  public resume() {
    if (this.audio && !this.isPlaying) {
      if (!this.audio.src && this.playlist.length > 0) {
        this.playTrack(this.currentTrackIndex, true);
      } else {
        this.audio.play().catch(() => {});
      }
    }
  }

  public playNext() {
    if (this.playlist.length === 0) return;
    const nextIdx = (this.currentTrackIndex + 1) % this.playlist.length;
    this.playTrack(nextIdx, true);
  }

  public playPrev() {
    if (this.playlist.length === 0) return;
    const prevIdx = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.playTrack(prevIdx, true);
  }

  public seek(seconds: number) {
    if (this.audio && !isNaN(seconds)) {
      this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration || 9999));
      this.notify();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentIndex(): number {
    return this.currentTrackIndex;
  }
}

export const musicEngine = new RealMusicEngine();
