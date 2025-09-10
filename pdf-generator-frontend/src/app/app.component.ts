import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfUploaderComponent } from "./components/pdf-uploader/pdf-uploader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PdfUploaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdf-generator-frontend';
}
