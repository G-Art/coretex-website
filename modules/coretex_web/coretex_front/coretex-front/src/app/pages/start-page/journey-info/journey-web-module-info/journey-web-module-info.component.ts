import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journey-web-module-info',
  templateUrl: './journey-web-module-info.component.html',
  styleUrls: ['./journey-web-module-info.component.scss']
})
export class JourneyWebModuleInfoComponent implements OnInit {

  toDoDtoExampleCollapsed = true;
  toDoListControllerExampleCollapsed = true;

  toDoListComponentExampleCollapsed = true;
  toDoItemExampleCollapsed = true;

  appModuleTsExampleCollapsed = true;

  toDoListControllerExample = `
  package com.example.project.controllers;

  import com.coretex.core.activeorm.services.ItemService;
  import com.coretex.items.core.GenericItem;
  import com.coretex.items.todolistcore.ToDoNoteItem;
  import com.example.project.dao.ToDoNoteDao;
  import com.example.project.dto.ToDoNoteDto;
  import org.springframework.web.bind.annotation.*;
  import reactor.core.publisher.Flux;

  import javax.annotation.Resource;
  import java.util.Comparator;
  import java.util.UUID;

  @RestController
  @RequestMapping("/v1/todo")
  public class ToDoNotesController {

    @Resource
    private ItemService itemService;
    @Resource
    private ToDoNoteDao toDoNoteDao;

    @PostMapping
    Flux&lt;ToDoNoteDto> create(@RequestBody ToDoNoteDto toDoNoteDto) {
      var toDoNoteItem = itemService.create(ToDoNoteItem.class);
      toDoNoteItem.setDescription(toDoNoteDto.getDescription());
      itemService.save(toDoNoteItem);
      return read();
    }

    @GetMapping()
    Flux&lt;ToDoNoteDto> read(){
      return Flux.fromStream(toDoNoteDao.findReactive()
      .sorted(Comparator.comparing(GenericItem::getCreateDate))
      .map(ToDoNoteDto::new));
    }

    @DeleteMapping
    Flux&lt;ToDoNoteDto> delete(@RequestParam("uuid") UUID uuid){
      itemService.delete(toDoNoteDao.find(uuid));
      return read();
    }
  }
  `;

  toDoDtoExample = `
  package com.example.project.dto;

  import com.coretex.items.todolistcore.ToDoNoteItem;

  import java.util.UUID;

  public class ToDoNoteDto {

    private UUID uuid;
    private String description;

    public ToDoNoteDto() {
    }

    public ToDoNoteDto(ToDoNoteItem i) {
      this.uuid = i.getUuid();
      this.description = i.getDescription();
    }

    public String getDescription() {
      return description;
    }

    public void setDescription(String description) {
      this.description = description;
    }

    public UUID getUuid() {
      return uuid;
    }

    public void setUuid(UUID uuid) {
      this.uuid = uuid;
    }
  }

`;

  toDoComponentTsExample = `
  import {Component, OnInit} from '@angular/core';
  import {TodoItem} from "./todo-item";
  import {HttpClient} from "@angular/common/http";
  import {Observable, Subject} from "rxjs";
  import {map, share} from "rxjs/operators";

  @Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
  })
  export class TodoListComponent implements OnInit {

    newItemDescription?: string

    toDoList?: Observable&lt;TodoItem[] | null>;

    constructor(private http: HttpClient) {
      this.load()
    }

    ngOnInit(): void {

    }

    load(): void {
      this.toDoList = this.http.get&lt;TodoItem[]>('/v1/todo', )
    }

    create(): void {
      if(this.newItemDescription){
        this.toDoList = this.http.post&lt;TodoItem[]>('/v1/todo',
          {'description': this.newItemDescription}, {
          })
        // @ts-ignore
        this.newItemDescription = null;
      }
    }

    update(uuid: string, description: string): void {
      this.toDoList = this.http.put&lt;TodoItem[]>('/v1/todo',
        {'uuid': uuid, 'description': description}, {
        });
    }

    delete(uuid: string): void {
      this.toDoList = this.http.delete&lt;TodoItem[]>('/v1/todo', {
        params: {'uuid': uuid}
      });
    }
  }
  `;

  toDoComponentScssExample = `
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  :root {
    --font-1: "Roboto", sans-serif;
  }

  body {
    background: linear-gradient(to bottom, #d22d36, #b24d65);
    background-size: 100%;
    min-height: 100vh;
  }

  .container {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    overflow: hidden;
  }

  .container h1 {
    color: white;
    text-align: center;
    text-decoration: underline;
    font-family: var(--font-1);
    margin: 20px 0px 5px 0px;
  }

  .container form {
    display: block;
    margin: 0 auto;
    text-align: center;
    background: white;
    padding: 20px 0px;
  }
  .container .todo-input {
    display: inline-block;
    font-size: 25px;
    border: none;
    outline: none;
  }
  .container .add {
    margin: 0px;
    background: #ccc;
    border: 5px solid #ccc;
    font-size: 25px;
  }

  .container .remove {
    margin: 0px;
    background: #ee2828;
    border: 5px solid #ee2828;
    font-size: 25px;
  }

  .container .todo-container {
    background: white;
    margin: 20px 0;
    width: 100%;
    min-height: 400px;
    padding: 10px;
  }

  .container .todo-container li {
    display: flex;
    justify-content: space-between;
    width: 95%;
    text-decoration: none;
    border-bottom: 3px #ccc solid;
  }

  /* The container */
  .checkbox {
    display: block;
    position: relative;
    padding-left: 5px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 5px;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .checkbox:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .checkbox input:checked ~ .checkmark {
    background-color: #b24d65;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .checkbox input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkbox .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .container .todo-container li div {
    display: inline-block;
    font-size: 22px;
    padding: 0px 10px 10px 40px;
    margin: 0px;
    font-family: var(--font-1);
  }
  `;

  toDoComponentHtmlExample = `
    <div class="container">
      <h1>Todo List</h1>
      <form>
        <input class="todo-input" [(ngModel)]="newItemDescription" [ngModelOptions]="{standalone: true}" placeholder="enter a todo">
        <button type="button" class="add" (click)="create()"> + ADD</button>
      </form>
      <div class="todo-container" *ngIf="toDoList">
        <li class="todo-item" *ngFor="let item of toDoList | async">
          <label class="checkbox">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
          <div>{{item.description}}</div>
          <button type="button" class="remove" (click)="delete(item.uuid)">-</button>
        </li>
      </div>
    </div>
  `;

  toDoItemTsExample = `
  export class TodoItem {

    // @ts-ignore
    public uuid: string;
    public description?: string
  }
  `;

  appModuleTsExample = `
  import {NgModule} from '@angular/core';
  import {BrowserModule, Title} from '@angular/platform-browser';
  import {AppRoutingModule} from './app-routing.module';
  import {AppComponent} from './app.component';
  import {DefaultLayoutComponent} from './layouts/default-layout/default-layout.component';
  import {HomePageComponent} from './pages/home-page/home-page.component';
  import {TodoListComponent} from './components/todo-list/todo-list.component';
  import {HttpClientModule} from "@angular/common/http";
  import {FormsModule} from "@angular/forms";

  @NgModule({
    declarations: [
      AppComponent,
      DefaultLayoutComponent,
      HomePageComponent,
      TodoListComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
    ],
    providers: [
      Title
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {
  }
  `;
  constructor() { }

  ngOnInit(): void {
  }

}
