import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { elementAt, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {


  items$;
  items;

  unsubList;
  unsubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() {

    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      });
    });

    this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', 'a989809870897897'), (element) => {
      
    });

    this.unsubSingle();
    this.unsubList();

   
    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    })
    this.items.unsubscribe();
  }



   getNotesRef(){
    return collection(this.firestore, 'notes');
   }

   getTrashRef(){
    return collection(this.firestore, 'trash');
   }

   getSingleDocRef(collectionId: string, docId: string){
 return doc(collection(this.firestore, collectionId), docId);
   }
}
