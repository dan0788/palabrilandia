import { Component, inject } from '@angular/core';
import { GamificationService } from '../../core/services/gamification.service';
import { SoundService } from '../../core/services/sound.service';

@Component({
  selector: 'app-mascot',
  templateUrl: './mascot.component.html',
  styleUrl: './mascot.component.scss'
})
export class MascotComponent {
  public gamification = inject(GamificationService);
  public sound = inject(SoundService);

  onMascotClick(): void {
    this.sound.playHint();
    const tips = [
      '💡 ¡Recuerda! Las palabras agudas llevan tilde cuando terminan en N, S o vocal.',
      '📖 "Había una vez..." es la llave que abre la puerta a los cuentos mágicos.',
      '✨ Las metáforas comparan dos realidades sin usar "como": "Tus ojos son dos luceros en la noche".',
      '🦉 En sintaxis de bachillerato: las oraciones coordinadas son independientes; las subordinadas dependen de una proposición principal.',
      '🎯 La tilde diacrítica distingue palabras con igual grafía: "él" (pronombre) vs "el" (artículo).',
      '✏️ Antes de P y B, siempre escribimos la letra M. ¡Como en campo, sombra o tambor!',
      '📜 "Caminante, no hay camino, se hace camino al andar" nos enseñó Antonio Machado en Proverbios y cantares.',
      '🌌 En el Realismo Mágico de García Márquez, lo extraordinario convive con lo cotidiano con absoluta naturalidad.',
      '🌿 Federico García Lorca unió la tradición popular del cante jondo con el vanguardismo de la Generación del 27.',
      '🔍 ¿Dudas con "conque" y "con que"? "Conque" equivale a "así que", mientras "con que" es preposición con relativo.',
      '✒️ El soneto clásico exige catorce versos endecasílabos: dos cuartetos (ABBA ABBA) y dos tercetos (CDC DCD).',
      '💡 El dequeísmo consiste en usar indebidamente "de que" cuando el verbo exige solo "que": "Pienso que vendrás", nunca "Pienso de que vendrás".',
      '📚 Una oración subordinada adjetiva funciona igual que un adjetivo calificativo y modifica al sustantivo antecedente.'
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    this.gamification.setMascotMessage(randomTip);
  }
}
