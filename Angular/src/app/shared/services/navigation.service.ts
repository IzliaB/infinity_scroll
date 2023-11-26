import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Navigation, compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from '../types/navigation.types';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{

    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    constructor(private _httpClient: HttpClient)
    {
    }

    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    

}
