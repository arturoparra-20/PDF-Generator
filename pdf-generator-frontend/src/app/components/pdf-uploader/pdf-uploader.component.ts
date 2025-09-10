import { Component } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-pdf-uploader',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './pdf-uploader.component.html',
  styleUrls: ['./pdf-uploader.component.css']
})
export class PdfUploaderComponent {
  selectedFiles: File[] = [];
  pdfUrl: SafeResourceUrl | null = null;
  private blobUrl: string | null = null; // guardamos la URL real para descarga
  invertir = false;
  mostrarModal = false;

  constructor(
    private pdfService: PdfService,
    private sanitizer: DomSanitizer
  ) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length === 2) {
      this.selectedFiles = Array.from(files);
      this.generarPreview();
    } else {
      alert("Debes seleccionar exactamente 2 imágenes");
      this.selectedFiles = [];
    }
  }

  // generatePdf() {
  //   if (this.selectedFiles.length === 2) {
  //     this.pdfService.generatePdf(this.selectedFiles).subscribe((pdfBlob) => {
  //       const blob = new Blob([pdfBlob], { type: 'application/pdf' });

  //       // ✅ guardamos la URL real
  //       this.blobUrl = window.URL.createObjectURL(blob);

  //       // ✅ convertimos la URL en segura para Angular
  //       this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.blobUrl);
  //     });
  //   }
  // }

    generarPreview() {
    this.pdfService.generatePdf(this.selectedFiles, this.invertir).subscribe((pdfBlob) => {
      
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });

        // ✅ guardamos la URL real
        this.blobUrl = window.URL.createObjectURL(blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.blobUrl!);
    });
  }

  toggleInvertir() {
    this.invertir = !this.invertir;
    this.generarPreview();
  }

  continuar() {
    this.mostrarModal = true;
  }


  downloadPdf() {
    if (!this.blobUrl) return;

    const link = document.createElement('a');
    link.href = this.blobUrl;
    link.download = 'documento.pdf';
    link.click();
  }
}
