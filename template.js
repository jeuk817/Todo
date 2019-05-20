
class Template {
    updateModule(task) {
        const { id, title, star, description, date } = task;
        let checked1 = "";
        let checked2 = "";
        let checked3 = "";
        switch (star.length) {
            case 1:
                checked1 += 'checked'
                break;
            case 2:
                checked2 += 'checked'
                break;
            case 3:
                checked3 += 'checked'
                break;
        }
        return `
        <fieldset style="width:230">
            <legend>편집기</legend>
            <input type="hidden" name="updatedId" value="${id}">
            <input type="text" name="newTitle" placeholder="제목" value='${title}'><br>
            <input type="radio" name="newStar" value="☆" ${checked1}>☆
            <input type="radio" name="newStar" value="☆☆" ${checked2}>☆☆
            <input type="radio" name="newStar" value="☆☆☆" ${checked3}>☆☆☆<br>
            <textarea name="newDescription" placeholder="내용" cols="30" rows="3" maxlength="100">${description}</textarea><br><br>
            <button formaction="/updateTask" type="submit"> 수정 </button> <input type="date" name="newDeadline" value='${date}'> 마감
        </fieldset>
    `
    }
}

module.exports = Template;