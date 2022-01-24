import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizeComponent } from './pages/admin/add-quize/add-quize.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizeQuestionsComponent } from './pages/admin/view-quize-questions/view-quize-questions.component';
import { ViewQuiziesComponent } from './pages/admin/view-quizies/view-quizies.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [

  { path: 'register', component: SignupComponent, pathMatch:'full' },
  { path: '', component: HomeComponent, pathMatch:'full' },
  { path: 'login', component: LoginComponent, pathMatch:'full' },
  { 
    path: 'user', 
    component: UserDashboardComponent, 
    canActivate:[NormalGuard],
    children:[
      {
        path:'category/:catId',
        component:LoadQuizComponent
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'instructions/:quizeId',
        component:InstructionsComponent
      },
    ]
  },
  {
    path:'start/:quizeId',
    component:StartComponent,
    canActivate:[NormalGuard],
  },
  {
    path:'update',
    component:UpdateProfileComponent,
    canActivate:[NormalGuard],
  },
  { 
  path: 'admin',
    component: DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
      },
      {
        path:'categories',
        component:ViewCategoriesComponent,
      },
      {
        path:'add-category',
        component:AddCategoryComponent,
      },
      {
        path:'quizies',
        component:ViewQuiziesComponent,
      },
      {
        path:'add-quize',
        component:AddQuizeComponent,
      },
      {
        path:'quize/:quizeId',
        component:UpdateQuizComponent,
      },
      {
        path:'view-questions/:id/:title',
        component:ViewQuizeQuestionsComponent,
      },
      {
        path: 'add-question/:id',
        component: AddQuestionComponent
      },
      {
        path: 'question/:questionId',
        component: UpdateQuestionComponent
      },
      {
        path:'update',
        component:UpdateProfileComponent,
        canActivate:[AdminGuard],
      },
    ],
    
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
