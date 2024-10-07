import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

interface Medicine {
  id: number;       // assuming there's an ID field, adjust as needed
  name: string;     // assuming there's a name field
  // Add other properties if necessary
}

@Component({
  selector: 'app-medicine-home',
  templateUrl: './medicine-home.component.html',
  styleUrls: ['./medicine-home.component.scss'],
})
export class MedicineHomeComponent {
  pincode: string = '333333';
  city: string = 'Jaipur';
  searchText: string = "";
  suggestions: Medicine[] = []; // Define the type of suggestions as Medicine[]

  constructor(private api: ApiService) {}

  
  serachCityByPincode() {
    if (this.pincode.trim().length === 6) {
      const endPoint = 'get-pincode-details?=' + this.pincode;
      this.api.getDataFromServer(endPoint).subscribe({
        next: (response: any) => {
          if (response && response.length > 0) {
            this.city = response[0].pincodeCity;
          }
        },
        error: () => {},
      });
    }
  }

  // Fetch suggestions based on user input
  onSearchChange() {
    if (this.searchText.length < 1) { // Start searching after 2 characters
      this.suggestions = []; // Clear suggestions
      return;
    }

    const endPoint = `medicines?name_like=${this.searchText}`;
    this.api.getDataFromServer(endPoint).subscribe({
      next: (data: any) => { // Ensure the response is typed correctly
        this.suggestions = data; // Update suggestions
      },
      error: () => {
        this.suggestions = []; // Clear on error
      },
    });
  }

  // Handle selecting a medicine from suggestions
  selectMedicine(suggestion: Medicine) {
    this.searchText = suggestion.name; // Set input value to selected suggestion
    this.suggestions = []; // Clear suggestions
  }
}
