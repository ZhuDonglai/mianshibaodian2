import request from "./axios";

export function getUserPage(data){
	return request({
		url: '/api/userinfo/page',
		method: 'post',
        data
	});
}

export function getOne(id){
	return request({
		url: `/api/userinfo/one?id=${id}`,
		method: 'get',
	});
}

export function delOne(id){
	return request({
		url: `/api/userinfo/delete?id=${id}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/api/userinfo/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/api/userinfo/edit',
		method: 'post',
		data
	});
}

