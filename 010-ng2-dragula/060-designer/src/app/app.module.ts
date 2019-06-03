import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';

import {DragulaModule} from 'ng2-dragula';
import { DesignerItemComponent } from './designer-item/designer-item.component';
import { DesignerEditorComponent } from './designer-editor/designer-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    DesignerItemComponent,
    DesignerEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,

    AppRoutingModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
