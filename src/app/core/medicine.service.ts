import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = 'http://localhost:3000/medicines'; // URL where your JSON server is running

  constructor(private http: HttpClient) {}

  // Fetch all medicines
  getMedicines(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Search for medicines that match the query
  searchMedicines(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?q=${query}`).pipe(
      map(medicines => medicines.filter(medicine => 
        medicine.name.toLowerCase().includes(query.toLowerCase()))
      )
    );
  }
}
