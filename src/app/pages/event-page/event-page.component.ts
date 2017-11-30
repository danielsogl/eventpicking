import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Log } from 'ng2-logger';
import { Observable } from 'rxjs/Observable';

import { Event } from '../../classes/event';
import { User } from '../../classes/user';
import { FirebaseAuthService } from '../../services/auth/firebase-auth/firebase-auth.service';
import { FirebaseFirestoreService } from '../../services/firebase/firestore/firebase-firestore.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit, OnDestroy {
  private log = Log.create('EventPageComponent');

  private sub: any;
  private id: string;

  public event: Observable<Event>;
  public user: User;
  public isOwner = false;

  images = [
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(145).jpg',
      description: 'Image 1'
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(150).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(150).jpg',
      description: 'Image 2'
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(152).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(152).jpg',
      description: 'Image 3'
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(42).jpg',
      description: 'Image 4'
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(151).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(151).jpg',
      description: 'Image 5'
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg',
      description: 'Image 6'
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(148).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(148).jpg',
      description: 'Image 7'
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(147).jpg',
      description: 'Image 8'
    },
    {
      img:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(149).jpg',
      thumb:
        'https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(149).jpg',
      description: 'Image 9'
    }
  ];

  constructor(
    private router: ActivatedRoute,
    private afs: FirebaseFirestoreService,
    private auth: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
    this.sub = this.router.params.subscribe(params => {
      this.id = params['id'];
      this.log.d('Event ID', this.id);
      if (this.id) {
        this.event = this.afs.getEvent(this.id).valueChanges();

        this.event.subscribe(event => {
          this.log.d('Event data', event);
          this.auth.user.subscribe((user: any) => {
            if (user) {
              this.user = user;
              this.afs
                .getPhotographerEventsFromProfile(this.user.uid)
                .valueChanges()
                .subscribe(data => {
                  if (data.filter((e: any) => e.id === this.id).length > 0) {
                    this.isOwner = true;
                    this.log.d('Photographer is owner of this event');
                  } else {
                    this.log.d('Photographer is not the owner of this event');
                  }
                });
            }
          });
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
