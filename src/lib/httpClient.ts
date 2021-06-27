import { postPostData, putPostData } from '@/types';

const bearerToken = () => `Bearer ${localStorage.getItem('token')}`;

export function postCategory(category: string) {
    return fetch('/api/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken(),
        },
        body: JSON.stringify({ name: category }),
    });
}

export function putCategory(category: string, parent?: string) {
    return fetch(`/api/category/${category}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken(),
        },
        body: JSON.stringify({ parent }),
    }).then(res => res.json());
}

export function forceDeleteReply(postUrl: string, replyID: string) {
    return fetch(`/api/post/${postUrl}/reply/${replyID}`, {
        method: 'DELETE',
        headers: { Authorization: bearerToken() },
    });
}

export function deleteReply(postUrl: string, replyID: string, password: string) {
    return fetch(`/api/post/${postUrl}/reply/${replyID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
}

export function postLoginData(id: string, password: string) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
    }).then(res => res.json());
}

export function getPost(url: string) {
    return fetch(`/api/post/${url}`, {
        headers: { Authorization: bearerToken() },
    }).then(res => res.json());
}

export function postPost(body: postPostData) {
    return fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
    }).then(res => res.json());
}

export function putPost(url: string, body: putPostData) {
    return fetch(`/api/post/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken(),
        },
        body: JSON.stringify(body),
    }).then(res => res.json());
}

export function deletePost(url: string) {
    return fetch(`/api/post/${url}`, {
        method: 'DELETE',
        headers: { Authorization: bearerToken() },
    });
}
