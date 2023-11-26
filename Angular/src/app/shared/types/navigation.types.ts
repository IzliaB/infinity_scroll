import { FuseNavigationItem } from '@fuse/components/navigation';

export interface Navigation
{
    compact: FuseNavigationItem[];
    default: FuseNavigationItem[];
    futuristic: FuseNavigationItem[];
    horizontal: FuseNavigationItem[];
}

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'mensajes',
        title: 'Chat',
        type: 'basic',
        icon: 'heroicons_outline:chat-alt',
        link: '/mensajes/mensajes'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'mensajes',
        title: 'Chat',
        type: 'basic',
        icon: 'heroicons_outline:chat-alt',
        link: '/mensajes/mensajes'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'mensajes',
        title: 'Chat',
        type: 'basic',
        icon: 'heroicons_outline:chat-alt',
        link: '/mensajes/mensajes'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'mensajes',
        title: 'Chat',
        type: 'basic',
        icon: 'heroicons_outline:chat-alt',
        link: '/mensajes/mensajes'
    }
];
