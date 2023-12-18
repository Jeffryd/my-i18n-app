import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { I18NextModule, ITranslationService, I18NEXT_SERVICE, I18NextTitle, defaultInterpolationFormat } from 'angular-i18next';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
export function appInit(i18next: ITranslationService) {
  return () => i18next.init({
      supportedLngs: ['en', 'gr'],
      fallbackLng: 'en',
      debug: true,
      returnEmptyString: false,
      ns: [
        'translation',
        'validation',
        'error',
      ],
      interpolation: {
        format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
      },
    });
}
export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}
export const I18N_PROVIDERS = [
{
  provide: APP_INITIALIZER,
  useFactory: appInit,
  deps: [I18NEXT_SERVICE],
  multi: true
},
{
  provide: Title,
  useClass: I18NextTitle
},
{
  provide: LOCALE_ID,
  deps: [I18NEXT_SERVICE],
  useFactory: localeIdFactory
}];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    I18NextModule.forRoot()
  ],
  providers: [I18N_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }