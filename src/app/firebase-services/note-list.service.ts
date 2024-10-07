import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {


  items$;
  firestore: Firestore = inject(Firestore);

  constructor() {
   
    this.items$ = collectionData(this.getNotesRef());
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
