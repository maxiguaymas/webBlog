import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// importamos los componentes a usar dinamicamente
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PaginaComponent } from './pagina/pagina.component';
import { NuevoComponenteComponent} from "./nuevo-componente/nuevo-componente.component";
import { ErrorComponent } from './error/error.component';
import { ArticleComponent } from './article/article.component';
import { SearchComponent } from './search/search.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';


// array de rutas
const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "blog", component: BlogComponent},
  {path: "article/:id", component: ArticleComponent},
  {path: "editar/:id", component: ArticleEditComponent},
  {path: "create", component: CreateArticleComponent},
  {path: "buscar/:search", component: SearchComponent},
  {path: "formulario", component: FormularioComponent},
  {path: "pagina", component: PaginaComponent},
  {path: "pruebas", component: NuevoComponenteComponent},
  {path: "pruebas/:nombre/:apellido", component: NuevoComponenteComponent},
  {path: "**", component: ErrorComponent}
];

// exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
