import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MascotComponent } from '../../components/mascot/mascot.component';
import { GamificationService } from '../../core/services/gamification.service';
import { SoundService } from '../../core/services/sound.service';

export interface GameCard {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  route: string;
  colorClass: string;
  topic: string;
  level: 'primaria' | 'bachillerato';
  skills: string[];
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, MascotComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public gamification = inject(GamificationService);
  public sound = inject(SoundService);

  public selectedFilter = signal<'todos' | 'primaria' | 'bachillerato'>('todos');

  public readonly games: GameCard[] = [
    // --- 5 Juegos Iniciales (Primaria y Nivel General) ---
    {
      id: 'word-fill',
      number: 'Juego 1',
      title: 'Palabras al Rescate',
      subtitle: 'Completar oraciones didácticas',
      description: 'Coloca la palabra correcta en el hueco: entrena la ortografía (b/v, c/s), acentuación y categorías gramaticales.',
      icon: '🧩',
      route: '/juegos/palabras',
      colorClass: 'mint',
      topic: 'Ortografía y Gramática',
      level: 'primaria',
      skills: ['Acentuación', 'Reglas b/v', 'Sustantivos']
    },
    {
      id: 'word-search',
      number: 'Juego 2',
      title: 'Caza de Letras Literarias',
      subtitle: 'Sopa de letras interactiva y dinámica',
      description: 'Encuentra términos clave como Poema, Verso, Novela, Ensayo y Fábula en tableros temáticos aleatorios.',
      icon: '🔍',
      route: '/juegos/sopa',
      colorClass: 'amber',
      topic: 'Vocabulario Literario',
      level: 'primaria',
      skills: ['Tableros Aleatorios', 'Géneros', 'Conceptos poéticos']
    },
    {
      id: 'riddles',
      number: 'Juego 3',
      title: 'El Búho Sabio: Adivinanzas',
      subtitle: 'Acertijos y versos rimados',
      description: 'Lee adivinanzas poéticas en rima sobre sonetos, Don Quijote, el Realismo Mágico y signos de puntuación.',
      icon: '🦉',
      route: '/juegos/adivinanzas',
      colorClass: 'purple',
      topic: 'Poesía y Comprensión',
      level: 'primaria',
      skills: ['Rima consonante', 'Metáforas', 'Inferencia']
    },
    {
      id: 'sentence-builder',
      number: 'Juego 4',
      title: 'El Taller de Fábulas y Versos',
      subtitle: 'Ordenar oraciones y textos',
      description: 'Reconstruye oraciones y moralejas clásicas desordenadas de Esopo y Machado con barajado dinámico.',
      icon: '📜',
      route: '/juegos/fabulas',
      colorClass: 'coral',
      topic: 'Sintaxis y Moralejas',
      level: 'primaria',
      skills: ['Sujeto y Predicado', 'Estructura textual', 'Moralejas']
    },
    {
      id: 'trivia',
      number: 'Juego 5',
      title: 'Trivia: Rueda de Letras',
      subtitle: 'Desafío de preguntas rápidas',
      description: 'Rondas interactivas sobre personajes de cuentos universales, reglas ortográficas y figuras de dicción con rachas.',
      icon: '⭐',
      route: '/juegos/trivia',
      colorClass: 'blue',
      topic: 'Cultura Literaria',
      level: 'primaria',
      skills: ['Cuentos clásicos', 'Reglas rápidas', 'Combos de Racha']
    },

    // --- 7 Juegos Nuevos (Nivel Bachillerato y Literatura Moderna) ---
    {
      id: 'syntax-lab',
      number: 'Juego 6',
      title: 'Laboratorio de Sintaxis',
      subtitle: 'Desarmador de oraciones compuestas',
      description: 'Analiza y clasifica proposiciones coordinadas y subordinadas (sustantivas de sujeto/CD, adjetivas y adverbiales).',
      icon: '🔬',
      route: '/juegos/sintaxis',
      colorClass: 'blue',
      topic: 'Sintaxis Compuesta',
      level: 'bachillerato',
      skills: ['Subordinadas', 'Nexos coordinantes', 'Bachillerato']
    },
    {
      id: 'literary-timeline',
      number: 'Juego 7',
      title: 'Cronos Literario',
      subtitle: 'Movimientos y autores contemporáneos',
      description: 'Clasifica autores y obras célebres en la Generación del 27, Vanguardias, Generación del 98 y Realismo Mágico.',
      icon: '🏛️',
      route: '/juegos/cronos',
      colorClass: 'purple',
      topic: 'Literatura Moderna',
      level: 'bachillerato',
      skills: ['Generación del 27', 'Realismo Mágico', 'Vanguardias']
    },
    {
      id: 'diacritic-duel',
      number: 'Juego 8',
      title: 'Duelo de Tildes Diacríticas',
      subtitle: 'El francotirador del acento crítico',
      description: 'Bátete en rápidos duelos distinguiendo monosílabos homófonos: dé/de, sí/si, aún/aun, más/mas y porqué/porque.',
      icon: '🎯',
      route: '/juegos/tildes',
      colorClass: 'mint',
      topic: 'Ortografía Crítica RAE',
      level: 'bachillerato',
      skills: ['Tilde Diacrítica', 'Monosílabos', 'Precisión RAE']
    },
    {
      id: 'rhetorical-figures',
      number: 'Juego 9',
      title: 'El Ojo Poético',
      subtitle: 'Cazador de figuras retóricas',
      description: 'Identifica tropos, sinestesias, oxímoros, hipérboles y anáforas en versos célebres de Quevedo, Lorca y Manrique.',
      icon: '👁️',
      route: '/juegos/figuras',
      colorClass: 'purple',
      topic: 'Retórica y Poética',
      level: 'bachillerato',
      skills: ['Sinestesia', 'Oxímoron', 'Análisis Poético']
    },
    {
      id: 'homophones',
      number: 'Juego 10',
      title: 'La Batalla de Homófonos',
      subtitle: 'El guardián del léxico dudoso',
      description: 'Elige la grafía correcta en contexto entre parejas engañosas: revelar/rebelar, gravar/grabar, valla/vaya y tubo/tuvo.',
      icon: '🛡️',
      route: '/juegos/homofonos',
      colorClass: 'coral',
      topic: 'Léxico y Homofonía',
      level: 'bachillerato',
      skills: ['Homófonos', 'Dobles Grafías', 'Ortografía Léxica']
    },
    {
      id: 'microfiction',
      number: 'Juego 11',
      title: 'Relámpago de Letras',
      subtitle: 'Desafío de microficción y subtexto',
      description: 'Lee relatos breves de Augusto Monterroso, García Márquez y Borges y descifra su ironía, elipsis y sentido oculto.',
      icon: '⚡',
      route: '/juegos/microficcion',
      colorClass: 'amber',
      topic: 'Comprensión Crítica',
      level: 'bachillerato',
      skills: ['Monterroso', 'Borges', 'Ironía Narrativa']
    },
    {
      id: 'quote-anagrams',
      number: 'Juego 12',
      title: 'El Descifrador del 27',
      subtitle: 'Criptogramas de citas legendarias',
      description: 'Reconstruye palabras anagramadas para restituir las frases y versos más hermosos de la lírica moderna.',
      icon: '🧩',
      route: '/juegos/anagramas',
      colorClass: 'blue',
      topic: 'Criptografía y Citas',
      level: 'bachillerato',
      skills: ['Anagramas', 'Citas Célebres', 'Agilidad Mental']
    }
  ];

  public filteredGames = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'todos') return this.games;
    return this.games.filter(g => g.level === filter);
  });

  public setFilter(filter: 'todos' | 'primaria' | 'bachillerato'): void {
    this.sound.playPop();
    this.selectedFilter.set(filter);
  }

  onGameHover(): void {
    this.sound.playPop();
  }
}
