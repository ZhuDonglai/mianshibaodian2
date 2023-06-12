import request from "./axios";

export function getInterviewWithTypeByPage(data) {
	return request({
		url: '/api/interview/getInterviewWithTypeByPage',
		method: 'post',
		data
	});
}

export function getInterviewsPageByUserId(data) {
	return request({
		url: '/api/interview/getInterviewsPageByUserId',
		method: 'post',
		data
	});
}

export function addInterview(data) {
	return request({
		url: '/api/interview/add',
		method: 'post',
		data
	});
}

export function updateInterview(data) {
	return request({
		url: '/api/interview/edit',
		method: 'post',
		data
	});
}



export function delOne(data) {
	return request({
		url: '/api/interview/delete/'+data,
		method: 'get',
		data
	});
}