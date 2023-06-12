import request from "./axios";

export function getInterviewTypes() {
	return request({
		url: '/api/interviewType/all',
		method: 'get',
	});
}

export function getOne(id) {
	return request({
		url: `/api/interviewType/one?id=${id}`,
		method: 'get',
	});
}

export function addInterviewType(data) {
	return request({
		url: '/api/interviewType/add',
		method: 'post',
		data
	});
}

export function updateInterviewType(data) {
	return request({
		url: '/api/interviewType/edit',
		method: 'post',
		data
	});
}



export function delOne(id) {
	return request({
		url: `/api/interviewType/delete?id=${id}`,
		method: 'get',
	});
}