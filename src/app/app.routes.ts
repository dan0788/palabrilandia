import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  // Juegos 1 a 5 (Primaria y Nivel General)
  {
    path: 'juegos/palabras',
    loadComponent: () => import('./features/games/word-fill/word-fill.component').then(m => m.WordFillComponent)
  },
  {
    path: 'juegos/sopa',
    loadComponent: () => import('./features/games/word-search/word-search.component').then(m => m.WordSearchComponent)
  },
  {
    path: 'juegos/adivinanzas',
    loadComponent: () => import('./features/games/riddles/riddles.component').then(m => m.RiddlesComponent)
  },
  {
    path: 'juegos/fabulas',
    loadComponent: () => import('./features/games/sentence-builder/sentence-builder.component').then(m => m.SentenceBuilderComponent)
  },
  {
    path: 'juegos/trivia',
    loadComponent: () => import('./features/games/trivia/trivia.component').then(m => m.TriviaComponent)
  },
  // Juegos 6 a 12 (Nivel Bachillerato, Literatura Moderna y Ortografía Crítica)
  {
    path: 'juegos/sintaxis',
    loadComponent: () => import('./features/games/syntax-lab/syntax-lab.component').then(m => m.SyntaxLabComponent)
  },
  {
    path: 'juegos/cronos',
    loadComponent: () => import('./features/games/literary-timeline/literary-timeline.component').then(m => m.LiteraryTimelineComponent)
  },
  {
    path: 'juegos/tildes',
    loadComponent: () => import('./features/games/diacritic-duel/diacritic-duel.component').then(m => m.DiacriticDuelComponent)
  },
  {
    path: 'juegos/figuras',
    loadComponent: () => import('./features/games/rhetorical-figures/rhetorical-figures.component').then(m => m.RhetoricalFiguresComponent)
  },
  {
    path: 'juegos/homofonos',
    loadComponent: () => import('./features/games/homophones/homophones.component').then(m => m.HomophonesComponent)
  },
  {
    path: 'juegos/microficcion',
    loadComponent: () => import('./features/games/microfiction/microfiction.component').then(m => m.MicrofictionComponent)
  },
  {
    path: 'juegos/anagramas',
    loadComponent: () => import('./features/games/quote-anagrams/quote-anagrams.component').then(m => m.QuoteAnagramsComponent)
  },
  // Vistas Generales
  {
    path: 'logros',
    loadComponent: () => import('./features/achievements/achievements.component').then(m => m.AchievementsComponent)
  },
  {
    path: 'biblioteca',
    loadComponent: () => import('./features/library/library.component').then(m => m.LibraryComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
