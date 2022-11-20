export const formatDate = (date:string):string =>{
	if(!date?.length){return "";}
	const jsDate = new Date(date);
	const minutes = `${jsDate.getMinutes()}`.length===1?`0${jsDate.getMinutes()}`:`${jsDate.getMinutes()}`;
	const hours = `${jsDate.getHours()}`.length===1?`0${jsDate.getHours()}`:`${jsDate.getHours()}`;
	return `${hours}:${minutes}`;
};
