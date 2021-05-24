import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-info',
  templateUrl: './items-info.component.html',
  styleUrls: ['./items-info.component.scss']
})
export class ItemsInfoComponent implements OnInit {
  structRelationExample = `
    elements {

        relations {

            OneToOneBidirectionalRelation(source: FirstExample, target: SecondExample){
                source(secondExample) {
                    description = "FirstExample"
                    associated = true
                }
                target(firstExample) {
                    description = "SecondExample"
                    associated = true
                }
            }

            OneToManyBidirectionalRelation(source: FirstExample, target: SecondExample){
                source(secondExampleOne) {
                    description = "FirstExample"
                    associated = true
                }
                target(firstExampleMany) {
                    description = "SecondExample"
                    associated = true
                    containerType = Set
                }
            }

            ManyToOneBidirectionalRelation(source: FirstExample, target: SecondExample){
                source(secondExampleMany) {
                    description = "FirstExample"
                    containerType = Set
                }
                target(firstExampleOne) {
                    description = "SecondExample"
                    associated = true

                }
            }
            ManyToManyBidirectionalRelation(source: FirstExample, target: SecondExample){
                source(mtmSecondExampleMany) {
                    description = "FirstExample"
                    containerType = Set
                }
                target(mtmFirstExampleMany) {
                    description = "SecondExample"
                    associated = true
                    containerType = Set
                }
            }
        }
        items {
            FirstExample {
                attributes {
                    example(String)
                }
            }
            SecondExample {
                attributes {
                    example(String)
                    firstExampleOneDirection(FirstExample)
                }
            }
        }
    }
  `;
  structItemExample = `
    Example {
        description = "Example item"
        attributes {
            exampleField(String) {
                description = "Example field"
            }
        }
    }

    ExampleExtend(extend: Example, table: false, abstract: true) {
        description = "Example item extend"
        attributes {
            exampleFieldNew(String) {
                description = "Example field new"
            }
        }
    }

    Example(enhance: 'example') {
        attributes {
            additionalExampleField(String) {
                description = "Example field"
            }
        }
    }
  `;
  structEnumExample = `
    Example {
      Example1
      Example2
      Example3
    }
  `;
  structExample = `
   elements {
        relations {
            ExampleRelation(source: ExampleLeftType, target: ExampleRightType) {
                source(targets) {
                    description = "Description(not mandatory)"
                    containerType = Set
                }
                target(sources) {
                    description = "Description(not mandatory)"
                    containerType = Set
                }
            }
        }
        items {
            Example {
              description = "Example item declaration"
              attributes {
                    exampleField1(String) {
                        description = "Example field declaration"
                    }
                }
            }
        }
        enums {
            Example {
              Example1
              Example2
              Example3
            }
        }
  }
  `;

  constructor() { }

  ngOnInit(): void {
  }

}
