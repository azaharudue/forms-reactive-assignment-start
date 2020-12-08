import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  projectCreationForm: FormGroup;
  forbiddenProjectName = ["Test"];
  projectStatus = ["Stable", "Critical", "Finished"];
  ngOnInit(): void {
    this.projectCreationForm = new FormGroup({
      projectData: new FormGroup({
        projectname: new FormControl("Test1", [
          Validators.required,
          this.forbiddenProjectNames.bind(this),
        ]),
        email: new FormControl(
          "Test1@email.com",
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
        projectStatus: new FormControl(),
      }),
    });
  }
  onSubmit(): void {
    console.log(this.projectCreationForm.value);
    this.projectCreationForm.reset();
  }
  forbiddenProjectNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectName.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  get controls() {
    return (this.projectCreationForm.get("projectStatus") as FormArray)
      .controls;
  }
}
