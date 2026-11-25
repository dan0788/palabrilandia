import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WordSearchTarget } from '../../../core/models/game.model';
import { GamificationService } from '../../../core/services/gamification.service';
import { SoundService } from '../../../core/services/sound.service';

interface GridCell {
  row: number;
  col: number;
  letter: string;
  foundColor?: string;
}

interface WordSearchBoard {
  title: string;
  levelBadge: string;
  words: WordSearchTarget[];
  letters: string[][];
}

@Component({
  selector: 'app-word-search',
  imports: [RouterLink],
  templateUrl: './word-search.component.html',
  styleUrl: './word-search.component.scss'
})
export class WordSearchComponent {
  private gamification = inject(GamificationService);
  private sound = inject(SoundService);

  // Repertorio ampliado de tableros literarios para Primaria y Bachillerato
  private readonly boards: WordSearchBoard[] = [
    {
      title: 'Términos Clásicos de Literatura',
      levelBadge: 'Nivel General',
      words: [
        { word: 'CUENTO', clue: 'Narración breve con personajes fantásticos o reales.', found: false, color: '#4ECDC4' },
        { word: 'POEMA', clue: 'Obra escrita en verso con ritmo, emoción y belleza.', found: false, color: '#FFD166' },
        { word: 'VERSO', clue: 'Cada una de las líneas que forman un poema.', found: false, color: '#FF6B6B' },
        { word: 'RIMA', clue: 'Sonido similar al final de los versos (ej: flor y amor).', found: false, color: '#54A0FF' },
        { word: 'FABULA', clue: 'Historia con animales que nos enseña una moraleja.', found: false, color: '#9B59B6' }
      ],
      letters: [
        ['C', 'U', 'E', 'N', 'T', 'O', 'X', 'B'],
        ['M', 'P', 'O', 'E', 'M', 'A', 'Z', 'A'],
        ['K', 'L', 'R', 'V', 'E', 'R', 'S', 'O'],
        ['S', 'R', 'I', 'M', 'A', 'Y', 'P', 'B'],
        ['T', 'U', 'L', 'B', 'X', 'W', 'K', 'U'],
        ['F', 'A', 'B', 'U', 'L', 'A', 'O', 'L'],
        ['A', 'L', 'E', 'T', 'R', 'A', 'S', 'A'],
        ['B', 'O', 'S', 'Q', 'U', 'E', 'S', 'P']
      ]
    },
    {
      title: 'Géneros y Figuras de Bachillerato',
      levelBadge: 'Nivel Bachillerato',
      words: [
        { word: 'NOVELA', clue: 'Obra narrativa extensa de ficción con trama compleja.', found: false, color: '#4ECDC4' },
        { word: 'TEATRO', clue: 'Género dramático concebido para su representación en escena.', found: false, color: '#FFD166' },
        { word: 'ENSAYO', clue: 'Texto en prosa que reflexiona y analiza críticamente un tema.', found: false, color: '#FF6B6B' },
        { word: 'PROSA', clue: 'Estructura textual natural no sujeta a la métrica del verso.', found: false, color: '#54A0FF' },
        { word: 'METAFORA', clue: 'Figura retórica que traslada el sentido de una palabra a otra.', found: false, color: '#9B59B6' }
      ],
      letters: [
        ['N', 'O', 'V', 'E', 'L', 'A', 'X', 'Y'],
        ['T', 'E', 'A', 'T', 'R', 'O', 'Z', 'K'],
        ['E', 'N', 'S', 'A', 'Y', 'O', 'W', 'M'],
        ['P', 'R', 'O', 'S', 'A', 'B', 'C', 'D'],
        ['M', 'E', 'T', 'A', 'F', 'O', 'R', 'A'],
        ['S', 'I', 'N', 'T', 'A', 'X', 'I', 'S'],
        ['L', 'E', 'T', 'R', 'A', 'S', 'E', 'M'],
        ['G', 'O', 'E', 'T', 'A', 'S', 'O', 'R']
      ]
    },
    {
      title: 'Poética y Vanguardia',
      levelBadge: 'Nivel Bachillerato',
      words: [
        { word: 'SONETO', clue: 'Poema estrófico clásico de catorce versos endecasílabos.', found: false, color: '#4ECDC4' },
        { word: 'ESTROFA', clue: 'Conjunto de versos agrupados con un patrón rítmico fijo.', found: false, color: '#FFD166' },
        { word: 'DRAMA', clue: 'Texto literario de conflicto resuelto a través del diálogo.', found: false, color: '#FF6B6B' },
        { word: 'MITO', clue: 'Relato simbólico tradicional sobre dioses o héroes arquetípicos.', found: false, color: '#54A0FF' },
        { word: 'LIRA', clue: 'Estrofa renacentista de cinco versos (Fray Luis de León).', found: false, color: '#9B59B6' }
      ],
      letters: [
        ['S', 'O', 'N', 'E', 'T', 'O', 'A', 'B'],
        ['E', 'S', 'T', 'R', 'O', 'F', 'A', 'C'],
        ['D', 'R', 'A', 'M', 'A', 'X', 'Y', 'Z'],
        ['M', 'I', 'T', 'O', 'W', 'K', 'P', 'Q'],
        ['L', 'I', 'R', 'A', 'V', 'E', 'N', 'A'],
        ['V', 'E', 'R', 'S', 'O', 'S', 'A', 'X'],
        ['L', 'U', 'Z', 'T', 'E', 'X', 'T', 'O'],
        ['P', 'L', 'U', 'M', 'A', 'S', 'O', 'L']
      ]
    }
  ];

  public currentBoardTitle = signal<string>('');
  public currentLevelBadge = signal<string>('');
  public words = signal<WordSearchTarget[]>([]);
  public grid = signal<GridCell[][]>([]);
  public selectedCells = signal<{ row: number; col: number }[]>([]);
  public gameFinished = signal<boolean>(false);
  public lastDiscoveredWord = signal<WordSearchTarget | null>(null);

  public foundCount = computed(() => this.words().filter(w => w.found).length);
  public totalWords = computed(() => this.words().length);

  constructor() {
    this.initRandomSession();
  }

  public initRandomSession(): void {
    // Selección aleatoria del tablero
    const randomIndex = Math.floor(Math.random() * this.boards.length);
    const chosen = this.boards[randomIndex];

    this.currentBoardTitle.set(chosen.title);
    this.currentLevelBadge.set(chosen.levelBadge);

    // Clonar palabras con estado inicial no encontrado
    const freshWords: WordSearchTarget[] = chosen.words.map(w => ({ ...w, found: false }));
    this.words.set(freshWords);

    // Inicializar celdas
    const formatted: GridCell[][] = chosen.letters.map((row, rIdx) =>
      row.map((letter, cIdx) => ({
        row: rIdx,
        col: cIdx,
        letter
      }))
    );
    this.grid.set(formatted);
    this.selectedCells.set([]);
    this.lastDiscoveredWord.set(null);
    this.gameFinished.set(false);
  }

  public isCellSelected(row: number, col: number): boolean {
    return this.selectedCells().some(c => c.row === row && c.col === col);
  }

  public onCellClick(row: number, col: number): void {
    this.sound.playPop();
    const current = [...this.selectedCells()];
    const index = current.findIndex(c => c.row === row && c.col === col);

    // Si hace clic en la última celda seleccionada, la deselecciona (deshacer paso a paso)
    if (index === current.length - 1 && current.length > 0) {
      current.pop();
      this.selectedCells.set(current);
      return;
    }

    // Si hace clic en una celda intermedia ya seleccionada, reiniciar selección en ella
    if (index >= 0) {
      this.selectedCells.set([{ row, col }]);
      return;
    }

    // Si no hay celdas seleccionadas, iniciar nueva selección
    if (current.length === 0) {
      this.selectedCells.set([{ row, col }]);
      return;
    }

    const first = current[0];
    const last = current[current.length - 1];

    // Caso 1: Clic paso a paso en celda adyacente en línea recta
    const dr = row - last.row;
    const dc = col - last.col;
    const isAdjacent = Math.abs(dr) <= 1 && Math.abs(dc) <= 1 && (dr !== 0 || dc !== 0);

    if (current.length === 1 && isAdjacent) {
      current.push({ row, col });
      this.selectedCells.set(current);
      this.checkSelectedWord(current);
      return;
    }

    if (current.length > 1) {
      const prevDr = last.row - current[current.length - 2].row;
      const prevDc = last.col - current[current.length - 2].col;
      if (dr === prevDr && dc === prevDc) {
        current.push({ row, col });
        this.selectedCells.set(current);
        this.checkSelectedWord(current);
        return;
      }
    }

    // Caso 2: Clic directo en la celda final de una línea recta (horizontal, vertical o diagonal)
    const lineCells = this.getLineBetween(first, { row, col });
    if (lineCells && lineCells.length > 1) {
      this.selectedCells.set(lineCells);
      this.checkSelectedWord(lineCells);
      return;
    }

    // Caso 3: Clic en celda no alineada -> Iniciar nueva selección en esa celda
    this.selectedCells.set([{ row, col }]);
  }

  private getLineBetween(start: { row: number; col: number }, end: { row: number; col: number }): { row: number; col: number }[] | null {
    const dr = end.row - start.row;
    const dc = end.col - start.col;

    const isHorizontal = dr === 0 && dc !== 0;
    const isVertical = dc === 0 && dr !== 0;
    const isDiagonal = Math.abs(dr) === Math.abs(dc) && dr !== 0;

    if (!isHorizontal && !isVertical && !isDiagonal) {
      return null;
    }

    const stepRow = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepCol = dc === 0 ? 0 : dc / Math.abs(dc);
    const steps = Math.max(Math.abs(dr), Math.abs(dc));

    if (steps > 8) return null;

    const result: { row: number; col: number }[] = [];
    for (let i = 0; i <= steps; i++) {
      result.push({
        row: start.row + i * stepRow,
        col: start.col + i * stepCol
      });
    }
    return result;
  }

  private checkSelectedWord(cells: { row: number; col: number }[]): void {
    if (cells.length < 3) return;

    const g = this.grid();
    const wordForward = cells.map(c => g[c.row][c.col].letter).join('');
    const wordBackward = [...cells].reverse().map(c => g[c.row][c.col].letter).join('');

    const target = this.words().find(w => !w.found && (w.word === wordForward || w.word === wordBackward));

    if (target) {
      this.sound.playCorrect();
      const updatedWords = this.words().map(w =>
        w.word === target.word ? { ...w, found: true } : w
      );
      this.words.set(updatedWords);

      const newGrid = this.grid().map(r => r.map(cell => ({ ...cell })));
      cells.forEach(c => {
        newGrid[c.row][c.col].foundColor = target.color;
      });
      this.grid.set(newGrid);

      this.selectedCells.set([]);
      this.lastDiscoveredWord.set(target);
      this.gamification.setMascotMessage(`✨ ¡Descubriste "${target.word}"! ${target.clue}`);

      if (updatedWords.every(w => w.found)) {
        this.finishGame();
      }
    }
  }

  public clearSelection(): void {
    this.sound.playPop();
    this.selectedCells.set([]);
  }

  public giveHint(): void {
    this.sound.playHint();
    const unfound = this.words().find(w => !w.found);
    if (!unfound) return;

    const coords = this.findWordCoordinates(unfound.word);
    if (coords && coords.length > 0) {
      const start = coords[0];
      this.selectedCells.set([start]);
      this.gamification.setMascotMessage(
        `💡 Pista de Plumi: La palabra "${unfound.word}" empieza en la fila ${start.row + 1}, columna ${start.col + 1}.`
      );
    }
  }

  private findWordCoordinates(word: string): { row: number; col: number }[] | null {
    const g = this.grid();
    const rows = g.length;
    if (rows === 0) return null;
    const cols = g[0].length;

    const directions = [
      { dr: 0, dc: 1 },   // horizontal derecha
      { dr: 0, dc: -1 },  // horizontal izquierda
      { dr: 1, dc: 0 },   // vertical abajo
      { dr: -1, dc: 0 },  // vertical arriba
      { dr: 1, dc: 1 },   // diagonal abajo-derecha
      { dr: 1, dc: -1 },  // diagonal abajo-izquierda
      { dr: -1, dc: 1 },  // diagonal arriba-derecha
      { dr: -1, dc: -1 }  // diagonal arriba-izquierda
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        for (const dir of directions) {
          let match = true;
          const coords: { row: number; col: number }[] = [];
          for (let i = 0; i < word.length; i++) {
            const nr = r + i * dir.dr;
            const nc = c + i * dir.dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || g[nr][nc].letter !== word[i]) {
              match = false;
              break;
            }
            coords.push({ row: nr, col: nc });
          }
          if (match) {
            return coords;
          }
        }
      }
    }
    return null;
  }

  private finishGame(): void {
    this.gameFinished.set(true);
    this.sound.playVictory();
    this.gamification.triggerConfetti();
    this.gamification.addXpAndStars(150, 3, 'completar la Sopa de Letras Literaria');
    this.gamification.unlockBadge('ojo-halcon');
  }

  public restartGame(): void {
    this.sound.playPop();
    this.initRandomSession();
  }
}
