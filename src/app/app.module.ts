import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
// used to create mock backend
import { fakeBackendProvider } from '../app/mock-backend/fake-backend';
import { GlobalService } from './services/global.service';
import { global } from '@angular/compiler/src/util';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    // provider used to create fake backend
    fakeBackendProvider,
    GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
