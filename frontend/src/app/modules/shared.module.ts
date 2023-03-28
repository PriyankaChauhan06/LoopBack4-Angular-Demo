import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TreeTableModule } from 'primeng/treetable';
import { FileUploadModule } from 'primeng/fileupload';
import { ChartModule } from 'primeng/chart';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ActionRoleDirective } from '../directives/action-role.directive';
import { UserRoleDirective } from '../directives/user-role.directive';
import { UserInnerComponent } from '../user-inner/user-inner.component';
import { SpinnerOverlayComponent } from '../spinner-overlay/spinner-overlay.component';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    ActionRoleDirective,
    UserRoleDirective,
    UserInnerComponent,
    SpinnerOverlayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatCardModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatStepperModule,
    MatTooltipModule,
    MatTreeModule,
    MatProgressSpinnerModule,

    DropdownModule,
    TabViewModule,
    DialogModule,
    ToastModule,
    ProgressSpinnerModule,
    CheckboxModule,
    KeyFilterModule,
    AccordionModule,
    CalendarModule,
    InputSwitchModule,
    MultiSelectModule,
    ToolbarModule,
    TooltipModule,
    RadioButtonModule,
    TreeTableModule,
    FileUploadModule,
    ChartModule,
  
    DragDropModule,
    NgxFileDropModule,
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatCardModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    DropdownModule,
    TabViewModule,
    DialogModule,
    ToastModule,
    ProgressSpinnerModule,
    CheckboxModule,
    KeyFilterModule,
    AccordionModule,
    CalendarModule,
    InputSwitchModule,
    MultiSelectModule,
    ToolbarModule,
    TooltipModule,
    MatStepperModule,
    RadioButtonModule,
    DragDropModule,
    TreeTableModule,
    FileUploadModule,
    ChartModule,
    MatTooltipModule,
    MatTreeModule,
    MatProgressSpinnerModule,

    ActionRoleDirective,
    UserRoleDirective,
    UserInnerComponent,
    SpinnerOverlayComponent,
    NgxFileDropModule,
  ],
})
export class SharedModule { }
