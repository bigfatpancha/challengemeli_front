import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  categories$ = this.categoriesSubject.asObservable();

  setCategories(categories: string[]) {
    this.categoriesSubject.next(categories);
  }
}
