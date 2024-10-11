import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { elementAt, Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  unsubTrash;
  unsubNotes;

  // items$;
  // items;

  // unsubList;

  // unsubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() {

    this.unsubNotes = this.subNotesList();
    this.unsubTrash = this.subTrashList();
    // this.unsubSingle = onSnapshot(this.getSingleDocRef('notes', 'a989809870897897'), (element) => {
    // });
    // this.items$ = collectionData(this.getNotesRef());
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(element => {
    //     console.log(element);
    //   });
    // })
  }

  async deleteNote(collectionId: "notes" | "trash", docId: string){
    try {
      await deleteDoc(this.getSingleDocRef(collectionId, docId));
      console.log("deleteNote() called");
    } catch (error) {
      console.log(error);
    }
  }


  async updateNote(note: Note ){
    // Set the "capital" field of the city 'DC'
    if(note.id){
      let docRef = this.getSingleDocRef(this.getCollectionIdFromNote(note), note.id);
      await updateDoc(docRef, this.getCleanJson(note)).catch(
        (error) => {console.log(error);}
      );
    }
   
  }

  getCleanJson(note:Note):{} {
    return {
      type: note.type,
      title: note.title,
      content: note.content,
      marked: note.marked
    }
  }

  getCollectionIdFromNote(note:Note){
    if(note.type == 'note'){
      return 'notes';
    }else{
      return 'trash';
    }
  }


  async addNote(item: Note, collectionId: "notes" | "trash"){
    await addDoc(this.getNotesRef(), item ).catch(
      (error) => {console.error(error)}
    ).then (
      (docRef)=> {console.log("Document written with ID: ", docRef?.id);}
    )
  }


  ngonDestroy(){
    // this.items.unsubscribe();
    // this.unsubSingle();
    this.unsubNotes();
    this.unsubTrash();
  }

  subTrashList(){
   return onSnapshot(this.getTrashRef(), (list) => {
    this.trashNotes = [];
      list.forEach(element => {
        this.trashNotes.push(this.setNoteObject(element.data(), element.id));
        // console.log(this.setNoteObject(element.data(), element.id));
      });
    });
  }

  subNotesList(){
    return onSnapshot(this.getNotesRef(), (list) => {
      this.normalNotes = [];
      list.forEach(element => {
        this.normalNotes.push(this.setNoteObject(element.data(), element.id));
        // console.log(this.setNoteObject(element.data(), element.id));
      });
    });
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

   setNoteObject(obj: any, id:string) : Note{

    return {
      id: id || "",
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
    }

   }


}
