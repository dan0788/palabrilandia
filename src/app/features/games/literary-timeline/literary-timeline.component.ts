import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LiteraryMovementChallenge } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-literary-timeline',
  imports: [RouterLink],
  templateUrl: './literary-timeline.component.html',
  styleUrl: './literary-timeline.component.scss'
})
export class LiteraryTimelineComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allChallenges: LiteraryMovementChallenge[] = [
    {
      id: 1,
      authorOrWork: 'Federico García Lorca ("Romancero gitano", 1928)',
      description: 'Poeta y dramaturgo andaluz que aunó el misterio popular de la tradición lírica con la vanguardia metafórica más deslumbrante.',
      keyFragment: '"La luna vino a la fragua con su polisón de nardos. El niño la mira, mira. El niño la está mirando."',
      options: ['Generación del 27', 'Modernismo', 'Generación del 98', 'Realismo Decimonónico'],
      correctMovement: 'Generación del 27',
      explanation: '¡Exacto! Lorca es la figura cumbre de la Generación del 27, reunida en torno al tricentenario de Góngora.'
    },
    {
      id: 2,
      authorOrWork: 'Gabriel García Márquez ("Cien años de soledad", 1967)',
      description: 'Nobel colombiano cuya obra maestra inmortalizó la aldea de Macondo, donde las lluvias duran años y los muertos conversan con los vivos.',
      keyFragment: '"El mundo era tan reciente, que muchas cosas carecían de nombre, y para mencionarlas había que señalarlas con el dedo."',
      options: ['El Realismo Mágico', 'El Romanticismo', 'El Existencialismo', 'El Neoclasicismo'],
      correctMovement: 'El Realismo Mágico',
      explanation: '¡Brillante! El Realismo Mágico revolucionó la literatura universal integrando prodigios insólitos en la vida cotidiana.'
    },
    {
      id: 3,
      authorOrWork: 'Rubén Darío ("Azul...", 1888)',
      description: 'Poeta nicaragüense que renovó la métrica castellana con sensualidad, exotismo cosmopolita y cisnes de níveo plumaje.',
      keyFragment: '"Ama tu ritmo y ritma tus acciones bajo su ley, así como tus versos; eres un universo de universos y tu alma una fuente de canciones."',
      options: ['Modernismo', 'Generación del 27', 'Barroco', 'Costumbrismo'],
      correctMovement: 'Modernismo',
      explanation: '¡Excelente! Rubén Darío es el padre y abanderado del Modernismo hispanoamericano.'
    },
    {
      id: 4,
      authorOrWork: 'Vicente Huidobro ("Altazor", 1931)',
      description: 'Poeta chileno que proclamó que el poeta no debe cantar a la rosa, sino hacerla florecer en el poema.',
      keyFragment: '"¿Por qué cantáis la rosa, ¡oh poetas!? Hacedla florecer en el poema. Solo para nosotros viven todas las cosas bajo el sol."',
      options: ['Creacionismo (Vanguardias)', 'Generación del 98', 'Romanticismo', 'Poesía Social'],
      correctMovement: 'Creacionismo (Vanguardias)',
      explanation: '¡Gran precisión! El Creacionismo fue una de las vanguardias hispanoamericanas más audaces del siglo XX.'
    },
    {
      id: 5,
      authorOrWork: 'Antonio Machado ("Campos de Castilla", 1912)',
      description: 'Poeta sevillano que cantó a las tierras castellanas, el paso inexorable del tiempo y la regeneración espiritual de España.',
      keyFragment: '"Castilla miserable, ayer dominadora, envuelta en sus andrajos desprecia cuanto ignora."',
      options: ['Generación del 98', 'Vanguardismo', 'Realismo Mágico', 'Siglo de Oro'],
      correctMovement: 'Generación del 98',
      explanation: '¡Totalmente acertado! Machado reflexiona con dolor y lucidez sobre el destino de España tras el desastre del 98.'
    },
    {
      id: 6,
      authorOrWork: 'Julio Cortázar ("Rayuela", 1963)',
      description: 'Escritor argentino que desafió la lectura lineal con una novela que puede leerse en múltiples órdenes alternativos.',
      keyFragment: '"Andábamos sin buscarnos pero sabiendo que andábamos para encontrarnos."',
      options: ['Boom Latinoamericano', 'Neoclasicismo', 'Modernismo', 'Mester de Clerecía'],
      correctMovement: 'Boom Latinoamericano',
      explanation: '¡Maravilloso! Cortázar representó la cúspide experimental y lúdica del Boom latinoamericano con su antinovela Rayuela.'
    }
  ];

  public activeChallenges = signal<LiteraryMovementChallenge[]>([]);
  public currentIndex = signal<number>(0);
  public selectedMovement = signal<string | null>(null);
  public isAnswerChecked = signal<boolean>(false);
  public isCorrect = signal<boolean>(false);
  public score = signal<number>(0);
  public gameFinished = signal<boolean>(false);

  public currentChallenge = computed(() => this.activeChallenges()[this.currentIndex()]);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    const sampled = sampleRandom(this.allChallenges, 5);
    const randomized = sampled.map(c => ({
      ...c,
      options: shuffleArray(c.options)
    }));

    this.activeChallenges.set(randomized);
    this.currentIndex.set(0);
    this.selectedMovement.set(null);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
    this.score.set(0);
    this.gameFinished.set(false);
  }

  public selectMovement(mov: string): void {
    if (this.isAnswerChecked()) return;
    this.sound.playPop();
    this.selectedMovement.set(mov);
  }

  public checkAnswer(): void {
    const selected = this.selectedMovement();
    if (!selected) return;

    const correct = selected === this.currentChallenge().correctMovement;
    this.isCorrect.set(correct);
    this.isAnswerChecked.set(true);

    if (correct) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.gamification.setMascotMessage('🏛️ ¡Magnífica erudición literaria! Conoces la historia de nuestras letras.');
    } else {
      this.sound.playIncorrect();
      this.gamification.setMascotMessage('💡 ¡Ánimo! Fíjate en la fecha y en el tono estético del fragmento.');
    }
  }

  public nextChallenge(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activeChallenges().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedMovement.set(null);
      this.isAnswerChecked.set(false);
    } else {
      this.finishGame();
    }
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 4 ? 3 : this.score() >= 2 ? 2 : 1;
    const earnedXp = this.score() * 35 + 30;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'superar el Cronos Literario de Bachillerato');
    if (this.score() >= 4) {
      this.gamification.unlockBadge('cronista-literario');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
