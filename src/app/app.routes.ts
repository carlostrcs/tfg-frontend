import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TrainingComponent } from './components/training/training.component';
import { DietComponent } from './components/diet/diet.component';
import { SleepComponent } from './components/sleep/sleep.component';
import { AuthGuard } from './guards/auth.guard';
import { NewTrainingComponent } from './components/training/new-training/new-training.component';
import { NewTemplateComponent } from './components/training/new-workout-template/new-workout-template.component';
import { NewExerciseComponent } from './components/training/new-exercise/new-exercise.component';
import { SelectExercisesForTemplateComponent } from './components/training/select-exercises-for-template/select-exercises-for-template.component';
import { DayTemplateComponent } from './components/diet/day-template/day-template.component';
import { SelectMealsForTemplateComponent } from './components/diet/select-meals-for-template/select-meals-for-template.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'training',component:TrainingComponent,canActivate:[AuthGuard]},
    {path:'diet',component:DietComponent,canActivate:[AuthGuard]},
    {path:'dietDayTemplate',component:DayTemplateComponent,canActivate:[AuthGuard]},
    {path:'selectMealsForTemplate',component:SelectMealsForTemplateComponent,canActivate:[AuthGuard]},
    {path:'sleep',component:SleepComponent,canActivate:[AuthGuard]},
    {path:'newEmptyTraining',component:NewTrainingComponent,canActivate:[AuthGuard]},
    {path:'newTemplate',component:NewTemplateComponent,canActivate:[AuthGuard]},
    {path:'selectExercisesForTemplate',component:SelectExercisesForTemplateComponent,canActivate:[AuthGuard]},
    {path:'newExercise',component:NewExerciseComponent,canActivate:[AuthGuard]},
    {path:'**',component:RegisterComponent}
];
