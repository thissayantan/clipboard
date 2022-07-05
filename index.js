console.log('js loaded');

document.querySelector('#test').addEventListener('click', async event => {
    console.log('working');
});

document.querySelector('#copy').addEventListener('click', async event => {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return
    }
    const text = document.querySelector('#textClipboard').value;
    const imageUrl = document.querySelector('#imageClipboard').value;
    try {
        // copy text
        await navigator.clipboard.writeText(text)
        console.log('Text Copied to clipboard');

        // copy image
        await copyImage(imageUrl);
        console.log('Image Copied to clipboard');
    } catch (err) {
        console.error('Failed to copy!', err)
    }
});

async function copyImage(url) {
    console.log("Wriing to clipbard");

    const response = await fetch(url);
    const blob = await response.blob();

    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]).then(function () {
        console.log("Copied to clipboard successfully!");
    }, function (error) {
        console.error("unable to write to clipboard. Error:");
        console.log(error);
    });
};

document.querySelector('#paste').addEventListener('click', async event => {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return
    }
    try {
        // text 
        const text = await navigator.clipboard.readText();
        document.querySelector('#pasteHere').innerHTML = text;

        // image
        const img = document.querySelector("#sample-img");
        navigator.clipboard.read().then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].types.includes("image/png")) {
                    // Clipboard does not contain image data
                } else {
                    data[i].getType("image/png").then((blob) => {
                        img.src = URL.createObjectURL(blob);
                    });
                }
            }
        });
    } catch (err) {
        console.error('Failed to copy!', err)
    }
});
