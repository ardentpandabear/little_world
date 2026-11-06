/**
 * Audio engine for character and narrator voice interactions.
 * Ensures only one voice recording plays at a time, supports pause/resume,
 * automatically pauses background music, and handles fallback audio candidate paths.
 */

import { musicEngine } from './audioEngine';

export interface VoicePlaybackState {
  activeId: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
}

type VoiceListener = (state: VoicePlaybackState) => void;

class VoiceAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private activeId: string | null = null;
  private isPlaying: boolean = false;
  private currentTime: number = 0;
  private duration: number = 0;
  private candidateUrls: string[] = [];
  private currentCandidateIndex: number = 0;
  private listeners: Set<VoiceListener> = new Set();
  private static workingUrlCache: Map<string, string> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'auto';

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('playing', () => {
        if (this.activeId && this.audio?.src) {
          VoiceAudioEngine.workingUrlCache.set(this.activeId, this.candidateUrls[this.currentCandidateIndex]);
        }
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('timeupdate', () => {
        if (this.audio) {
          this.currentTime = this.audio.currentTime;
          this.duration = this.audio.duration || this.duration;
          this.notify();
        }
      });

      this.audio.addEventListener('loadedmetadata', () => {
        if (this.audio) {
          this.duration = this.audio.duration;
          this.notify();
        }
      });

      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this.currentTime = 0;
        this.notify();
      });

      this.audio.addEventListener('error', (e) => {
        console.warn(`Voice candidate failed: ${this.candidateUrls[this.currentCandidateIndex]}`, e);
        this.tryNextCandidate();
      });
    }
  }

  private tryNextCandidate() {
    this.currentCandidateIndex += 1;
    if (this.audio && this.currentCandidateIndex < this.candidateUrls.length) {
      const nextSrc = this.candidateUrls[this.currentCandidateIndex];
      this.audio.src = nextSrc;
      this.audio.load();
      this.audio.play().catch((err) => {
        console.warn(`Could not play candidate: ${nextSrc}`, err);
      });
    } else {
      // All candidates exhausted
      this.isPlaying = false;
      this.notify();
    }
  }

  public playVoice(id: string, candidateUrls: string[]) {
    if (!this.audio) return;

    // Pause background music if it is currently playing so voice lines are crystal clear
    if (musicEngine && typeof musicEngine.pause === 'function') {
      try {
        musicEngine.pause();
      } catch (e) {
        // Safe catch
      }
    }

    // If clicking the active recording, toggle pause / resume
    if (this.activeId === id) {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play().catch((err) => console.warn('Audio resume error:', err));
      }
      return;
    }

    // Switching to a new voice recording: stop current
    this.audio.pause();
    this.audio.currentTime = 0;
    this.activeId = id;

    // If we have a verified working URL in cache for this ID, put it first in the list
    const cachedUrl = VoiceAudioEngine.workingUrlCache.get(id);
    let orderedCandidates = candidateUrls;
    if (cachedUrl && candidateUrls.includes(cachedUrl)) {
      orderedCandidates = [cachedUrl, ...candidateUrls.filter((u) => u !== cachedUrl)];
    }

    this.candidateUrls = orderedCandidates;
    this.currentCandidateIndex = 0;
    this.currentTime = 0;
    this.duration = 0;

    if (orderedCandidates.length > 0) {
      const initialSrc = orderedCandidates[0];
      this.audio.src = initialSrc;
      this.audio.load();
      this.audio.play().catch((err) => {
        console.warn('Initial candidate play error, will attempt fallback:', err);
      });
    }
    this.notify();
  }

  public stopVoice() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.activeId = null;
    this.isPlaying = false;
    this.notify();
  }

  public getState(): VoicePlaybackState {
    return {
      activeId: this.activeId,
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration
    };
  }

  public subscribe(listener: VoiceListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }
}

export const voiceEngine = new VoiceAudioEngine();
