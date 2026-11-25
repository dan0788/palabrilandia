import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MicrofictionChallenge } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';
import { sampleRandom, shuffleArray } from '../../../core/utils/random.util';

@Component({
  selector: 'app-microfiction',
  imports: [RouterLink],
  templateUrl: './microfiction.component.html',
  styleUrl: './microfiction.component.scss'
})
export class MicrofictionComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  private readonly allChallenges: MicrofictionChallenge[] = [
    {
      id: 1,
      title: 'El Dinosaurio',
      author: 'Augusto Monterroso (1959)',
      text: '"Cuando despertó, el dinosaurio todavía estaba allí."',
      question: '¿Cuál es el recurso narrativo principal que convierte a este célebre microrrelato en una obra maestra?',
      options: [
        'La elipsis narrativa que obliga al lector a imaginar quién despertó y qué representa el dinosaurio',
        'La descripción minuciosa y científica de un reptil fósil prehistórico',
        'El uso de rima consonante al final de cada cláusula',
        'La presencia de un narrador en primera persona testigo'
      ],
      correctIndex: 0,
      literaryAnalysis: '¡Análisis crítico sobresaliente! Monterroso juega con la frontera entre el sueño y la vigilia: la palabra "todavía" presupone que el dinosaurio ya habitaba la realidad antes de despertar.'
    },
    {
      id: 2,
      title: 'El Sueño de la Mariposa',
      author: 'Parábola de Chuang Tzu / Jorge Luis Borges',
      text: '"Un hombre sueña que es una mariposa volando feliz entre las flores. Al despertar, ignora con angustia si es un hombre que soñó ser mariposa o una mariposa que ahora sueña que es un hombre."',
      question: '¿Qué dilema filosófico y literario plantea este microcuento?',
      options: [
        'La fragilidad de la identidad y la disolución de los límites entre realidad y sueño',
        'Una moraleja tradicional sobre el cuidado de los insectos en primavera',
        'La evolución biológica de los seres alados',
        'Un conflicto amoroso no correspondido'
      ],
      correctIndex: 0,
      literaryAnalysis: '¡Profunda comprensión! Borges retomó esta célebre paradoja oriental para explorar el laberinto de la conciencia y la ficción ontológica.'
    },
    {
      id: 3,
      title: 'El Fantasma y el Recuerdo',
      author: 'Juan José Arreola',
      text: '"La mujer que amé se ha convertido en fantasma. Yo soy el lugar de sus apariciones."',
      question: 'En la frase "Yo soy el lugar de sus apariciones", ¿qué metáfora psicológica se expresa?',
      options: [
        'Que el amante mantiene vivo el recuerdo y la ausencia de su amor en su propia memoria y cuerpo',
        'Que el protagonista compró una casa encantada en el campo',
        'Que la mujer era una hechicera con poderes sobrenaturales',
        'Que el narrador padece una enfermedad del sueño'
      ],
      correctIndex: 0,
      literaryAnalysis: '¡Magnífica interpretación poética! El narrador se define no como observador pasivo, sino como el espacio interior donde el dolor y el recuerdo se materializan.'
    },
    {
      id: 4,
      title: 'El Drama del Desencantado',
      author: 'Gabriel García Márquez',
      text: '"... a medida que caía en su salto suicida, fue viendo a través de las ventanas de los pisos la intimidad conmovedora de sus vecinos, las reconciliaciones, los abrazos y la ternura; entonces comprendió que la vida valía la pena, pero ya era demasiado tarde."',
      question: '¿Cuál es el efecto estético y dramático del final de este relato?',
      options: [
        'La ironía trágica: la revelación del valor de la vida ocurre en el instante irreversible de la caída',
        'Un final feliz y cómico donde el personaje logra detener su descenso',
        'Una crítica social al diseño arquitectónico de los edificios modernos',
        'Un tratado médico sobre la velocidad terminal'
      ],
      correctIndex: 0,
      literaryAnalysis: '¡Extraordinario! García Márquez maneja con maestría la ironía trágica y la aceleración del tiempo narrativo frente a la epifanía tardía.'
    }
  ];

  public activeChallenges = signal<MicrofictionChallenge[]>([]);
  public currentIndex = signal<number>(0);
  public selectedIndex = signal<number | null>(null);
  public isAnswerChecked = signal<boolean>(false);
  public isCorrect = signal<boolean>(false);
  public score = signal<number>(0);
  public gameFinished = signal<boolean>(false);

  public currentChallenge = computed(() => this.activeChallenges()[this.currentIndex()]);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    const sampled = sampleRandom(this.allChallenges, 3);
    const randomized = sampled.map(c => {
      const originalCorrectText = c.options[c.correctIndex];
      const shuffledOptions = shuffleArray(c.options);
      const newCorrectIndex = shuffledOptions.indexOf(originalCorrectText);
      return {
        ...c,
        options: shuffledOptions,
        correctIndex: newCorrectIndex
      };
    });

    this.activeChallenges.set(randomized);
    this.currentIndex.set(0);
    this.selectedIndex.set(null);
    this.isAnswerChecked.set(false);
    this.isCorrect.set(false);
    this.score.set(0);
    this.gameFinished.set(false);
  }

  public selectOption(idx: number): void {
    if (this.isAnswerChecked()) return;
    this.selectedIndex.set(idx);
    this.sound.playPop();

    const correct = idx === this.currentChallenge().correctIndex;
    this.isCorrect.set(correct);
    this.isAnswerChecked.set(true);

    if (correct) {
      this.sound.playCorrect();
      this.score.update(s => s + 1);
      this.gamification.setMascotMessage('⚡ ¡Comprensión lectora relámpago! Descifraste el subtexto de la microficción.');
    } else {
      this.sound.playIncorrect();
      this.gamification.setMascotMessage('💡 ¡En los microrrelatos, lo no dicho es tan importante como lo escrito!');
    }
  }

  public nextChallenge(): void {
    this.sound.playPop();
    if (this.currentIndex() < this.activeChallenges().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.selectedIndex.set(null);
      this.isAnswerChecked.set(false);
    } else {
      this.finishGame();
    }
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    const earnedStars = this.score() >= 3 ? 3 : this.score() >= 2 ? 2 : 1;
    const earnedXp = this.score() * 40 + 30;

    this.gamification.addXpAndStars(earnedXp, earnedStars, 'completar el Desafío de Microficción');
    if (this.score() >= 2) {
      this.gamification.unlockBadge('lector-microficcion');
    }
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initSession();
  }
}
