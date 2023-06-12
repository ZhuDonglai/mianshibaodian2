import request from "./axios";

export function getInterviewRemarkByPage(data) {
	return request({
		url: '/api/interviewRemark/remarkInterviewVoPage',
		method: 'post',
		data
	});
}

export function getOne(data) {
	return request({
		url: '/api/interviewRemark/userRemarkInterviewVoPage',
		method: 'post',
		data
	});
}

export function addInterviewRemark(data) {
	return request({
		url: '/api/interviewRemark/add',
		method: 'post',
		data
	});
}

export function updateInterviewRemark(data) {
	return request({
		url: '/api/interviewRemark/edit',
		method: 'post',
		data
	});
}



export function delOne(data) {
	return request({
		url: '/api/interviewRemark/delete/'+data,
		method: 'get',
		data
	});
}