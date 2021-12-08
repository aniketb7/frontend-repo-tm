import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './models/list.model';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  constructor(private webReqService: WebRequestService) { // this line is injecting the web-request service we created

   }

  getList():Observable<List[]> {
    return <Observable<List[]>>this.webReqService.get('lists');
  }

  createList(title: string): Observable<List> {
    // We want to send a web request to create a list
    return <Observable<List>>this.webReqService.post('lists', { title });
  }
   updateList(id: string , title: string): Observable<List> {
    // We want to send a web request to update a list
    return <Observable<List>>this.webReqService.patch( `lists/${id}`, { title })||'{}';
  }
  deleteList(id:string){
    return this.webReqService.delete(`lists/${id}`);
  }

  getTasks(listId: string): Observable<Task[]> {
    return <Observable<Task[]>>this.webReqService.get(`lists/${listId}/tasks`);
  }
    updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }
  
  createTask(title: string, listId: string):Observable<Task>{
    // We want to send a web request to create a Task
     return <Observable<Task>>this.webReqService.post(`lists/${listId}/tasks`, { title }); // this is returning a observable
  }
  
   deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }
  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
  
}