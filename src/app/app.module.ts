import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { RPNCalculatorComponent } from './rpncalculator/rpncalculator.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { FactoryValueComponent } from './factory-value/factory-value.component';
import { HistoryHolesComponent } from './history-holes/history-holes.component';
import { HistorySpeedBumbsComponent } from './history-speed-bumbs/history-speed-bumbs.component';
import { HistorySpotlightsComponent } from './history-spotlights/history-spotlights.component';
import { HistoryStopsComponent } from './history-stops/history-stops.component';
import { RegisterLineComponent } from './register-line/register-line.component';
import { ReportComponent } from './report/report.component';
import { ReportResultsComponent } from './report-results/report-results.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ViewLineComponent } from './view-line/view-line.component';
import { AuxiliaryTableComponent } from './auxiliary-table/auxiliary-table.component';


const routes: Routes = [
	{
		path: '', component: HomeComponent
	},
	{
		path: 'rpn', component: RPNCalculatorComponent
	},
	{
		path: 'factoryValue', component: FactoryValueComponent
	},
	{
		path: 'historyHoles', component: HistoryHolesComponent
	},
	{
		path: 'historySpeedBumbs', component: HistorySpeedBumbsComponent
	},
	{
		path: 'historySpotlights', component: HistorySpotlightsComponent
	},
	{
		path: 'historyStops', component: HistoryStopsComponent
	},
	{
		path: 'registerLine', component: RegisterLineComponent
	},
	{
		path: 'report', component: ReportComponent
	},
	{
		path: 'reportResult', component: ReportResultsComponent
	},
	{
		path: 'updateProfile', component: UpdateProfileComponent
	},
	{
		path: 'viewLine', component: ViewLineComponent
	},
	{
		path: 'auxiliaryTable', component: AuxiliaryTableComponent
	}

];

@NgModule({
	declarations: [
		AppComponent,
		RPNCalculatorComponent,
		HeaderComponent,
		ReportComponent,
		ReportResultsComponent,
		HomeComponent,
		FactoryValueComponent,
		HistoryHolesComponent,
		HistorySpeedBumbsComponent,
		HistorySpotlightsComponent,
		HistoryStopsComponent,
		RegisterLineComponent,
		UpdateProfileComponent,
		ViewLineComponent,
		AuxiliaryTableComponent,

	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
