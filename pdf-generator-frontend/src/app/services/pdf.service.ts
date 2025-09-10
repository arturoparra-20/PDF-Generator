import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private apiUrl = 'http://localhost:8000'; // URL backend Flask

  constructor(private http: HttpClient) {}

  generatePdf(images: File[], invertir: boolean = false): Observable<Blob> {
    const formData = new FormData();

        if (invertir) {
      images = [...images].reverse();
    }

    images.forEach(img => formData.append('images', img));

    return this.http.post(`${this.apiUrl}/generate-pdf`, formData, {
      responseType: 'blob' // respuesta es un PDF (binario)
    });
  }
}
