const createOnClickInfo = () => {

    let handled_click = false

    const setHandeledClick = () => {
        handled_click = true
        setTimeout(() => {
            handled_click = false
          }, 500);
    }

    const getHandeledClick = () => {
        return handled_click
    }

    return {
        setHandeledClick, getHandeledClick
    };
}

export const {getHandeledClick, setHandeledClick} = createOnClickInfo();