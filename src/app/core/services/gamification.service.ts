import { Injectable, computed, inject, signal } from '@angular/core';
import confetti from 'canvas-confetti';
import { Badge, UserStats } from '../models/game.model';
import { SoundService } from './sound.service';

@Injectable({
  providedIn: 'root'
})
export class GamificationService {
  private sound = inject(SoundService);

  // Estados reactivos con Signals
  public readonly xp = signal<number>(120);
  public readonly stars = signal<number>(5);
  public readonly streak = signal<number>(2);
  public readonly gamesPlayed = signal<number>(3);
  public readonly selectedAvatar = signal<string>('🦉');
  public readonly mascotMessage = signal<string>('¡Hola explorador! Soy Plumi el Búho. ¿Listo para jugar con las palabras hoy?');

  public readonly badges = signal<Badge[]>([
    {
      id: 'primer-paso',
      title: 'Primer Paso Lector',
      description: '¡Completaste tu primera actividad educativa con éxito!',
      icon: '🌱',
      unlocked: true,
      requirementText: 'Completa 1 juego cualquiera'
    },
    {
      id: 'maestro-ortografia',
      title: 'Guardián de la Ortografía',
      description: 'Dominaste los retos de b/v, c/s y la acentuación.',
      icon: '✨',
      unlocked: false,
      requirementText: 'Completa una ronda en Palabras al Rescate'
    },
    {
      id: 'ojo-halcon',
      title: 'Ojo de Halcón Literario',
      description: 'Encontraste todas las palabras escondidas en la sopa de letras.',
      icon: '🔍',
      unlocked: false,
      requirementText: 'Encuentra todas las palabras en la Sopa de Letras'
    },
    {
      id: 'sabio-adivinanzas',
      title: 'Acertijo Resuelto',
      description: 'Descifraste las adivinanzas poéticas del Sabio Búho.',
      icon: '🦉',
      unlocked: false,
      requirementText: 'Resuelve 3 adivinanzas'
    },
    {
      id: 'creador-fabulas',
      title: 'Constructor de Historias',
      description: 'Reconstruiste los versos y fábulas desordenadas con gran sintaxis.',
      icon: '📜',
      unlocked: false,
      requirementText: 'Ordena correctamente 2 fábulas'
    },
    {
      id: 'campeon-trivia',
      title: 'Estrella de las Letras',
      description: 'Alcanzaste una racha perfecta en el Desafío de Trivia.',
      icon: '⭐',
      unlocked: false,
      requirementText: 'Acierta 4 preguntas seguidas en la Trivia'
    },
    {
      id: 'analista-sintactico',
      title: 'Analista Sintáctico de Élite',
      description: 'Desarmaste proposiciones subordinadas y coordinadas a la perfección.',
      icon: '🔬',
      unlocked: false,
      requirementText: 'Supera el Laboratorio de Sintaxis'
    },
    {
      id: 'cronista-literario',
      title: 'Cronista de Vanguardias',
      description: 'Dominaste los movimientos literarios desde el Modernismo hasta el Boom.',
      icon: '🏛️',
      unlocked: false,
      requirementText: 'Acierta los movimientos en Cronos Literario'
    },
    {
      id: 'francotirador-tilde',
      title: 'Francotirador de la Tilde',
      description: 'Superaste el duelo de tildes diacríticas sin cometer ningún error.',
      icon: '🎯',
      unlocked: false,
      requirementText: 'Gana en el Duelo de Tildes Diacríticas'
    },
    {
      id: 'ojo-retorico',
      title: 'Ojo Poético y Retórico',
      description: 'Identificaste metáforas, oxímoros y sinestesias como un crítico literario.',
      icon: '👁️',
      unlocked: false,
      requirementText: 'Descubre las figuras en El Ojo Poético'
    },
    {
      id: 'maestro-homofonos',
      title: 'Guardián del Léxico Homófono',
      description: 'Triunfaste en la batalla de homófonos dudosos de bachillerato.',
      icon: '🛡️',
      unlocked: false,
      requirementText: 'Supera la Batalla de Homófonos'
    },
    {
      id: 'lector-microficcion',
      title: 'Relámpago de la Ficción',
      description: 'Descifraste la ironía y el misterio de los microcuentos modernos.',
      icon: '⚡',
      unlocked: false,
      requirementText: 'Completa los retos de Microficción'
    },
    {
      id: 'descifrador-versos',
      title: 'Criptógrafo del 27',
      description: 'Reconstruiste citas y versos emblemáticos a partir de anagramas.',
      icon: '🧩',
      unlocked: false,
      requirementText: 'Descifra 3 anagramas literarios'
    },
    {
      id: 'erudito-bachillerato',
      title: 'Erudito de Bachillerato',
      description: 'Máximo galardón académico otorgado a los maestros de Lengua y Literatura.',
      icon: '👑',
      unlocked: false,
      requirementText: 'Alcanza más de 800 XP en la plataforma'
    }
  ]);

  // Nivel calculado dinámicamente según XP
  public readonly level = computed(() => {
    const points = this.xp();
    if (points < 100) return { number: 1, title: 'Aprendiz de Letras', nextXp: 100, progress: (points / 100) * 100 };
    if (points < 250) return { number: 2, title: 'Explorador de Palabras', nextXp: 250, progress: ((points - 100) / 150) * 100 };
    if (points < 450) return { number: 3, title: 'Cazador de Rimas', nextXp: 450, progress: ((points - 250) / 200) * 100 };
    if (points < 700) return { number: 4, title: 'Cuentacuentos Sabio', nextXp: 700, progress: ((points - 450) / 250) * 100 };
    return { number: 5, title: 'Maestro de la Pluma', nextXp: 1000, progress: Math.min(100, ((points - 700) / 300) * 100) };
  });

  constructor() {
    this.loadStats();
  }

  private loadStats(): void {
    try {
      const data = localStorage.getItem('lengua_aventura_stats');
      if (data) {
        const parsed: UserStats = JSON.parse(data);
        this.xp.set(parsed.xp || 120);
        this.stars.set(parsed.stars || 5);
        this.streak.set(parsed.streak || 2);
        this.gamesPlayed.set(parsed.gamesPlayed || 3);
        this.selectedAvatar.set(parsed.selectedAvatar || '🦉');
      }

      const savedBadges = localStorage.getItem('lengua_aventura_badges');
      if (savedBadges) {
        const parsedBadges: Badge[] = JSON.parse(savedBadges);
        this.badges.set(parsedBadges);
      }
    } catch {
      // Usar valores iniciales seguros
    }
  }

  private saveStats(): void {
    try {
      const stats: UserStats = {
        xp: this.xp(),
        stars: this.stars(),
        level: this.level().number,
        streak: this.streak(),
        gamesPlayed: this.gamesPlayed(),
        soundEnabled: !this.sound.isMuted(),
        selectedAvatar: this.selectedAvatar()
      };
      localStorage.setItem('lengua_aventura_stats', JSON.stringify(stats));
      localStorage.setItem('lengua_aventura_badges', JSON.stringify(this.badges()));
    } catch {
      // Ignorar errores en modo incógnito/restringido
    }
  }

  public addXpAndStars(points: number, starsEarned: number, reason: string): void {
    const oldLevel = this.level().number;
    this.xp.update(val => val + points);
    this.stars.update(val => val + starsEarned);
    this.gamesPlayed.update(val => val + 1);

    this.sound.playCorrect();

    if (this.level().number > oldLevel) {
      this.sound.playVictory();
      this.triggerConfetti();
      this.setMascotMessage(`🎉 ¡Felicidades! ¡Subiste al Nivel ${this.level().number}: ${this.level().title}!`);
    } else {
      this.setMascotMessage(`🌟 ¡Excelente trabajo! Ganaste +${points} XP y ${starsEarned} ⭐ por ${reason}.`);
    }

    this.saveStats();
  }

  public unlockBadge(badgeId: string): void {
    const current = this.badges();
    const target = current.find(b => b.id === badgeId);
    if (target && !target.unlocked) {
      this.badges.update(list =>
        list.map(b => b.id === badgeId ? { ...b, unlocked: true, unlockedAt: new Date() } : b)
      );
      this.sound.playVictory();
      this.triggerConfetti();
      this.setMascotMessage(`🏆 ¡Nueva medalla desbloqueada: "${target.title}"! ¡Eres genial!`);
      this.saveStats();
    }
  }

  public setAvatar(avatar: string): void {
    this.selectedAvatar.set(avatar);
    this.sound.playPop();
    this.saveStats();
  }

  public setMascotMessage(msg: string): void {
    this.mascotMessage.set(msg);
  }

  public triggerConfetti(): void {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4ECDC4', '#FFD166', '#FF6B6B', '#54A0FF', '#9B59B6']
      });
    } catch {
      // Confetti fallback
    }
  }

  public resetProgress(): void {
    this.xp.set(0);
    this.stars.set(0);
    this.streak.set(1);
    this.gamesPlayed.set(0);
    this.badges.update(list => list.map(b => ({ ...b, unlocked: b.id === 'primer-paso' })));
    this.saveStats();
    this.setMascotMessage('¡Hemos preparado un nuevo cuaderno de aventuras para ti!');
  }
}
