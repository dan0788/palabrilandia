import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-openspec-info',
  imports: [RouterLink],
  templateUrl: './openspec-info.component.html',
  styleUrl: './openspec-info.component.scss'
})
export class OpenspecInfoComponent {
  public copied = false;

  copyCommand(cmd: string): void {
    navigator.clipboard?.writeText(cmd);
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }
}
