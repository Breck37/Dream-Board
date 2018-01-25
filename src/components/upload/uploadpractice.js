render(){
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if(imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} alt='display' />);
    } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>)
    }

    return (
        <div className='component'>
            <Header />
        <div className="previewComponent">
            <form onSubmit={(e) => this._handleSubmit(e)}>
                <input 
                className='fileInput'
                type='file'
                onChange={(e) => this._handleImageChange(e)} />
            </form>
            <div className='submit'><button className="submitButton"
            type="submit"
            onClick={(e) => this._handleSubmit(e)}>Upload Dream</button></div>
            <div className='imgPreview'>
            {$imagePreview}
            </div>
            <textarea 
            placeholder='Add Image Caption'
            className="caption" />
        </div>
        </div>
    )
}