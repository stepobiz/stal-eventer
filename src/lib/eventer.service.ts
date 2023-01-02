import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum StalEventType {
	OTHER, RELOAD, START_LOADING, END_LOADING, MESSAGE
}

export interface StalEvent {
	type: StalEventType,
	data?: any,
}

export interface StalEventMessage {
	severity: string,
	text: string,
	duration: number
}

@Injectable({ providedIn: 'root' })
export class StalEventerService {

	private eventSubject$ = new Subject<StalEvent>();

	onEvent() {
		return this.eventSubject$.asObservable();
	}

	launchEvent(data: StalEvent) {
		this.eventSubject$.next(data);
	}

	launchReloadContent(data: any = {}) {
		this.eventSubject$.next({
			type: StalEventType.RELOAD,
			data: data
		});
	}

	launchMessage(message: StalEventMessage) {
		this.eventSubject$.next({
			type: StalEventType.MESSAGE,
			data: message
		});
	}

	loadingStart() {
		this.eventSubject$.next({
			type: StalEventType.START_LOADING
		});
	}

	loadingEnd() {
		this.eventSubject$.next({
			type: StalEventType.END_LOADING
		});
	}
}