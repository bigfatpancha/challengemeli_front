import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  form = this.fb.group({
    search: [null],
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  onSubmit(): void {
    console.log(this.form.controls.search.value);
    this.router.navigate(['items'],  { queryParams: { search: this.form.controls.search.value}, relativeTo: this.route });
  }

}
