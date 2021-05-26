const { assert } = require('chai');

const DVideo = artifacts.require("DVideo");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DVideo',([deployer,author]) =>{
    let dvideo;
    before(async () =>{
        dvideo=await DVideo.deployed()
    })

    describe('DVideo devlopment',async () =>{
        it('deployed successfully',async () =>{
            const address =await dvideo.address
            assert.notEqual(address,'');
            assert.notEqual(address,0x0);
            assert.notEqual(address,null);
            assert.notEqual(address,undefined);
        })
        it('Has a name',async () =>{
            const name =await dvideo.name()
            // console.log('1111111111111111111111111 '+name)
            assert.equal(name,'DVideo')
        })
    })
    describe('Video',async () =>{
        const hash='2731Qq8nw1983n98y4y';
        const title='video title'
        let result,videocount
        before(async () =>{
            result = await dvideo.uploadVideo(hash,title,{from:author})
            videocount=await dvideo.videoCount()
        })
        it('video testing',async () =>{
            // SUCCESS
            assert.equal(videocount,1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(),videocount.toNumber(),'Id is correct')
            assert.equal(event.hash,hash,'Hash is correct')
            assert.equal(event.title,title,'Title is correct')
            assert.equal(event.author,author,'Author is correct')
            // FALIURE
            await dvideo.uploadVideo('',title,{from: author}).should.be.rejected;
            await dvideo.uploadVideo(hash,'',{from: author}).should.be.rejected;
        })
        // check from struct 
        it('Video upload lists',async ()=>{
            const video = await dvideo.videos(videocount)
            assert.equal(video.id,1,'Id should be correct')
            assert.equal(video.title,title,'title should be correct')
            assert.equal(video.hash,hash,'hash should be correct')
            assert.equal(video.author,author,'author should be correct')
        })
    })
})    