import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APIServices } from '../services/api.services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  pdfs: any[] = [];
  filteredPDFs: any[] = [];
  searchTerm = '';
  selectedPDF: any | null = null;

  constructor(
    private service: APIServices,
    private sanitizer: DomSanitizer
  ) { }
  logout() {
    localStorage.clear();
  }

  ngOnInit(): void {
    //Call API to get all PDF's
    this.service.find_all().subscribe((res: any) => {
      this.pdfs = res;
      this.filteredPDFs = res;
    }, (error: any) => {
      console.log(error)
    })
  }

  filterByAuthor(author: string) {
    this.filteredPDFs = this.pdfs.filter(p => p.author?.name === author);
  }

  filterByTag(tag: string) {
    this.filteredPDFs = this.pdfs.filter(p =>
      p.tags.some((t: any) => t.name === tag)
    );
  }

  openPDF(pdf: any) {
    this.selectedPDF = this.sanitizer.bypassSecurityTrustResourceUrl(pdf?.assets[0]?.url);
  }

}
