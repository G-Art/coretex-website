import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-journey-info',
  templateUrl: './journey-info.component.html',
  styleUrls: ['./journey-info.component.scss']
})
export class JourneyInfoComponent implements OnInit {

  isCollapsed1 = true;
  isCollapsed2 = true;

  structExample1 = `
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
                  priority(Integer)
              }
          }
      }

      enums {

      }
  }
  `;
  structExample2 = `
  package com.example.project.dao;

  import com.coretex.core.activeorm.dao.DefaultGenericDao;
  import com.coretex.items.todolistcore.ToDoNoteItem;
  import org.springframework.stereotype.Component;

  @Component
  public class ToDoNoteDao extends DefaultGenericDao&lt;ToDoNoteItem> {
    public ToDoNoteDao() {
      super(ToDoNoteItem.ITEM_TYPE);
    }
  }
  `;

  constructor() {
  }

  ngOnInit(): void {
  }

}
