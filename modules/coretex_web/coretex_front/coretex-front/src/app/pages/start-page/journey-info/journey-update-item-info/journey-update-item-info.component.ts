import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journey-update-item-info',
  templateUrl: './journey-update-item-info.component.html',
  styleUrls: ['./journey-update-item-info.component.scss']
})
export class JourneyUpdateItemInfoComponent implements OnInit {

  toDoListComponentExampleCollapsed = true;
  toDoItemExampleCollapsed = true;


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

    changeDone(uuid: string){
      this.toDoList = this.http.put&lt;TodoItem[]>('/v1/todo/done',
        {'uuid': uuid}
      );
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
            <input [checked]="item.done" type="checkbox" (click)="changeDone(item.uuid)">
            <span class="checkmark"></span>
          </label>
          <div [style.text-decoration]="item.done? 'line-through' : 'none'" >{{item.description}}</div>
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
    public done: boolean = false;
  }
  `;

  modifiedControllerCollapsed = true;
  modifiedController = `
  package com.example.project.controllers;

  import com.coretex.core.activeorm.services.ItemService;
  import com.coretex.items.todolistcore.ToDoNoteItem;
  import com.example.project.dao.ToDoNoteDao;
  import com.example.project.dto.ToDoNoteDto;
  import org.springframework.web.bind.annotation.*;
  import reactor.core.publisher.Flux;

  import javax.annotation.Resource;
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
    Flux&lt;ToDoNoteDto> read() {
      return Flux.fromStream(toDoNoteDao.findReactive("SELECT * FROM " + ToDoNoteItem.ITEM_TYPE +
                  " ORDER BY " + ToDoNoteItem.DONE + ", " + ToDoNoteItem.CREATE_DATE + " desc")
                  .map(ToDoNoteDto::new));
    }

    @PutMapping("/done")
    Flux&lt;ToDoNoteDto> updateDone(@RequestBody ToDoNoteDto toDoNoteDto) {
      var toDoNoteItem = toDoNoteDao.find(toDoNoteDto.getUuid());
      toDoNoteItem.setDone(!toDoNoteItem.getDone());
      itemService.save(toDoNoteItem);
      return read();
    }

    @DeleteMapping
    Flux&lt;ToDoNoteDto> delete(@RequestParam("uuid") UUID uuid) {
      itemService.delete(toDoNoteDao.find(uuid));
      return read();
  }

  `;
  modifiedDTOCollapsed = true;
  modifiedDTO = `
  package com.example.project.dto;

  import com.coretex.items.todolistcore.ToDoNoteItem;

  import java.util.UUID;

  public class ToDoNoteDto {

    private UUID uuid;
    private String description;
    private boolean done;

    public ToDoNoteDto() {
    }

    public ToDoNoteDto(ToDoNoteItem i) {
      this.uuid = i.getUuid();
      this.description = i.getDescription();
      this.done = i.getDone();
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

    public boolean isDone() {
      return done;
    }

    public void setDone(boolean done) {
      this.done = done;
    }
  }
  `;

  modifiedStructCollapsed = true;
  modifiedStruct = `
  elements {

      relations {

      }

      items {

          ToDoNote {
              description = "Generic item"
              attributes {
                  description(String) {
                      description = "ToDo description"
                  }
                  done(Boolean) {
                      description = "Done status"
                      optional = false
                      defaultValue = false
                  }
              }
          }
      }

      enums {

      }
  }
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
