import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Riddle } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-riddles',
  imports: [RouterLink],
  templateUrl: './riddles.component.html',
  styleUrl: './riddles.component.scss'
})
export class RiddlesComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allRiddles: Riddle[] = [
    {
      id: 1,
      verse: [
        'Tengo hojas sin ser árbol,',
        'te hablo sin tener voz;',
        'si me abres no me quejo,',
        '¡y aprendes con emoción!'
      ],
      answer: 'El libro',
      options: ['El libro', 'El árbol', 'El teléfono', 'El periódico'],
      hints: [
        'Vive en las estanterías de tu habitación y la biblioteca.',
        'Tiene un lomo, portada y muchas páginas llenas de letras.'
      ],
      educationalNote: '¡Magia poética! Esta adivinanza usa una figura literaria llamada "personificación" (darle cualidades humanas a un objeto).'
    },
    {
      id: 2,
      verse: [
        'Aunque soy flaquito y largo,',
        'dejo huellas al pasar;',
        'si me sacas buena punta,',
        '¡mucho más puedo cantar!'
      ],
      answer: 'El lápiz',
      options: ['El borrador', 'El lápiz', 'La regla', 'La tijera'],
      hints: [
        'Está hecho de madera y tiene una mina de grafito por dentro.',
        'Lo usas cada día para dibujar y escribir en tu cuaderno.'
      ],
      educationalNote: '¡Rima consonante! Fíjate cómo riman "pasar" y "cantar" con los mismos sonidos finales en -ar.'
    },
    {
      id: 3,
      verse: [
        'En el medio del mar estoy,',
        'en el principio del agua también;',
        'no me busques en la tierra,',
        '¡pero en el aire me ves muy bien!'
      ],
      answer: 'La letra A',
      options: ['El pez', 'La letra A', 'El barco', 'La letra O'],
      hints: [
        'Es la primera vocal de nuestro abecedario.',
        'M-A-R... ¡mira qué letra está justo en el centro!'
      ],
      educationalNote: '¡Juegos de palabras y caligramas! Las letras también son personajes traviesos en los poemas infantiles.'
    },
    {
      id: 4,
      verse: [
        'Una casa muy tranquila',
        'donde viven mil historias;',
        'si caminas en silencio,',
        '¡viajarás por la memoria!'
      ],
      answer: 'La biblioteca',
      options: ['El cine', 'El zoológico', 'La biblioteca', 'El parque'],
      hints: [
        'Es un lugar mágico lleno de estantes repletos de libros infantiles.',
        'Hay que guardar silencio para que todos puedan leer y soñar.'
      ],
      educationalNote: '¡La metáfora de la casa! Compara un lugar de estudio con un hogar acogedor lleno de aventuras.'
    },
    {
      id: 5,
      verse: [
        'Un puntito arriba tengo,',
        'y una colita al compás;',
        'pauso un poco tu lectura,',
        '¡y respiras mucho más!'
      ],
      answer: 'El punto y coma',
      options: ['El signo de interrogación', 'El punto y coma', 'Las comillas', 'El guion'],
      hints: [
        'Es un signo de puntuación que une dos partes: punto arriba y coma abajo.',
        'Indica una pausa más larga que la coma, pero más corta que el punto.'
      ],
      educationalNote: '¡Los signos de puntuación! Son como las señales de tránsito de la lectura: nos dicen cuándo parar y respirar.'
    },
    {
      id: 6,
      verse: [
        'Catorce versos me forman,',
        'endecasílabos al compás;',
        'dos cuartetos van primero,',
        '¡y dos tercetos detrás!'
      ],
      answer: 'El soneto',
      options: ['El romance', 'El soneto', 'La fábula', 'El caligrama'],
      hints: [
        'Lope de Vega escribió uno muy famoso: "Un soneto me manda hacer Violante...".',
        'Es la forma estrófica cumbre del Siglo de Oro y el Renacimiento.'
      ],
      educationalNote: '¡Métrica de Bachillerato! El soneto consta de 14 versos de arte mayor (11 sílabas cada uno).'
    },
    {
      id: 7,
      verse: [
        'De la Mancha salgo al viento',
        'con lanza y yelmo prestado;',
        'confundo molinos fieros',
        '¡con gigantes del pasado!'
      ],
      answer: 'Don Quijote',
      options: ['El Cid Campeador', 'Don Quijote', 'Lazarillo de Tormes', 'Sancho Panza'],
      hints: [
        'Protagonista cumbre de la novela universal escrita por Miguel de Cervantes.',
        'Caballero andante enamorado de su dama Dulcinea del Toboso.'
      ],
      educationalNote: '¡Literatura Clásica! La obra cumbre en español que parodia las novelas de caballería.'
    },
    {
      id: 8,
      verse: [
        'En Macondo no amanece,',
        'llueve sin parar cuatro años;',
        'mariposas amarillas',
        '¡anuncian amores y desengaños!'
      ],
      answer: 'El Realismo Mágico',
      options: ['El Neoclasicismo', 'El Realismo Mágico', 'El Romanticismo', 'El Barroco'],
      hints: [
        'Movimiento de Gabriel García Márquez en "Cien años de soledad".',
        'Narra sucesos prodigiosos y mágicos como si fueran cotidianos.'
      ],
      educationalNote: '¡Literatura Hispanoamericana! El Realismo Mágico transformó la narrativa universal del siglo XX.'
    },
    {
      id: 9,
      verse: [
        'Una rayita inclinada',
        'que sobre la vocal descansa;',
        'distingue el "sí" que asegura,',
        '¡del "si" de la duda que avanza!'
      ],
      answer: 'La tilde diacrítica',
      options: ['La diéresis', 'La tilde diacrítica', 'El apóstrofo', 'La coma elíptica'],
      hints: [
        'Se utiliza para diferenciar palabras que se escriben igual pero tienen funciones gramaticales distintas.',
        'Permite distinguir: tú (pronombre) de tu (posesivo).'
      ],
      educationalNote: '¡Ortografía Crítica! La tilde diacrítica no sigue las reglas generales de acentuación, sino que cumple una función distintiva.'
    }
  ];

  public activeRiddles = signal<Riddle[]>([]);
  public currentIndex = signal<number>(0);
  public selectedOption = signal<string | null>(null);
  public isAnswerChecked = signal<boolean>(false);
  public isCorrect = signal<boolean>(false);
  public revealedHintsCount = signal<number>(0);
  public score = signal<number>(0);
  public gameFinished = signal<boolean>(false);

  public currentRiddle = computed(() => this.activeRiddles()[this.currentIndex()]);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    const sampled = sampleRandom(this.allRiddles, 5);
    const riddlesWithShuffledOptions = sampled.map(r => ({
      ...r,
      options: shuffleArray(r.options)
    }));

    this.activeRiddles.set(riddlesWithShuffledOptions);
    this.currentIndex.set(0);
    this.selectedOption.set(null);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
    this.revealedHintsCount.set(0);
    this.score.set(0);
    this.gameFinished.set(false);
  }

  public selectOption(opt: string): void {
    if (this.isAnswerChecked()) return;
    this.sound.playPop();
    this.selectedOption.set(opt);
  }

  public checkAnswer(): void {
    const selected = this.selectedOption();
    if (!selected) return;

    const correct = selected === this.currentRiddle().answer;
    this.isCorrect.set(correct);
    this.isAnswerChecked.set(true);

    if (correct) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.gamification.setMascotMessage('🦉 ¡Uhuuu! ¡Has resuelto el misterio del verso!');
    } else {
      this.sound.playIncorrect();
      this.gamification.setMascotMessage('🦉 ¡Casi! La poesía a veces juega a las escondidas.');
    }
  }

  public revealNextHint(): void {
    if (this.revealedHintsCount() < this.currentRiddle().hints.length) {
      this.sound.playHint();
      this.revealedHintsCount.update(c => c + 1);
    }
  }

  public nextRiddle(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activeRiddles().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedOption.set(null);
      this.isAnswerChecked.set(false);
      this.revealedHintsCount.set(0);
    } else {
      this.finishGame();
    }
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 4 ? 3 : this.score() >= 2 ? 2 : 1;
    const earnedXp = this.score() * 30 + 30;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'resolver las adivinanzas del Sabio Búho');
    if (this.score() >= 3) {
      this.gamification.unlockBadge('sabio-adivinanzas');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
