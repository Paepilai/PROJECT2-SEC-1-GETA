<script setup>
import { ref } from 'vue';

const ListImage = ref([
  {
    "id": 1,
    "image": "https://img.freepik.com/free-photo/water-polo-player-pool-with-swimming-equipment_23-2150893950.jpg?w=1060&t=st=1709829051~exp=1709829651~hmac=1520d4a0b288c1d51e46eb77bb4d25de146e52912fb213fc04c37e762ea76d9b"
  },
  {
    "id": 2,
    "image": "https://img.freepik.com/premium-photo/portrait-smiling-young-man-standing-outdoors_1048944-29813224.jpg?w=1060"
  }
],);

const currentIndex = ref(0);

const nextImage = () => {
  currentIndex.value++;
  if (currentIndex.value >= ListImage.value.length) {
    currentIndex.value = 0;
  }
};

const prevImage = () => {
  currentIndex.value--;
  if (currentIndex.value < 0) {
    currentIndex.value = ListImage.value.length - 1;
  }
};
</script>

<template>

  <div class="grid grid-cols-3 gap-1 pb-20">
    <div class="col-span-2">
      <div class="flex-col">
        <div class=" font-bold text-4xl p-10 text-center">
          <h1>Camp1</h1>
        </div>
        <div class="flex">
          <a class="btn btn-circle " @click="prevImage">❮</a>
          <img :src="ListImage[currentIndex].image" class="rounded-lg max-w-4xl justify-center mx-auto">
          <a class="btn btn-circle" @click="nextImage">❯</a>
        </div>
      </div>

    </div>

    <div class="col-start-3 border-2 rounded-md shadow-md m-5 h-auto">
      <div class="font-bold text-3xl p-10 text-center ">
        <h3>Camp Details</h3>
      </div>
      <hr class="h-2 border-dashed border-gray-300 ">
      <div class="font-bold text-2xl p-5 text-center">
        <h3>Location</h3>
      </div>
      <div class="text-xl pl-20 pr-20 pb-10">
        <p>ดอยอ่างขาง อุทยานแห่งชาติดอยฟ้าห่มปก อ.ฝาง จ.เชียงใหม่</p>
      </div>
      <hr class="h-2 border-dashed border-gray-300 ">
      <div class="font-bold text-2xl p-5 text-center ">
        <h3>Price</h3>
      </div>
      <div class="text-xl pl-20 pr-20 pb-10">
        <p>
          เต็นท์ขนาด 2 คน 200 บาท, เต็นท์ 3 คน ราคา 225 บาท,
          นำเต็นท์มาเองคิดค่าบริการสถานที่กางเต็นท์ คนละ 30 บาท/คืน
        </p>
      </div>



      <hr class="h-2 border-dashed border-gray-300 ">

      <div class="flex justify-center p-10 ">
        <a href="#" class="btn bg-[#F79C1D] hover:bg-[#F79C1D] text-white text-2xl">Join Camp</a>
      </div>


    </div>
  </div>

  <hr class="h-2 border-dashed border-gray-800 ">


  <div class="font-bold text-2xl m-10 pl-20">
    <h3>Camp Description</h3>
  </div>

  <div class="text-lg m-10 pl-20 pr-20 pb-10">
    <p>
      "ลานกางเต็นท์และจุดชมพระอาทิตย์ขึ้นและทะเลหมอกที่งดงามบนดอยอ่างขาง
      ตั้งอยู่ท่ามกลางป่าสนบนเนินเขาสูงหรือในภาษาเหนือเรียกว่า “ม่อน” สมชื่อ
      ที่นี่เป็นจุดชมวิวที่นักท่องเที่ยวนิยมมากางเต็นท์ดูพระอาทิตย์ขึ้นและลุ้นทะเลหมอก
      ท่ามกลางวิว180 องศา
      ใครมาเที่ยวดอยอ่างขางสามารถแวะมาถ่ายรูปหรือจะค้างคืนที่นี่ด้วยก็ได้
      บริเวณลานกางเต็นท์ มีทั้งร้านค้า ร้านกาแฟและร้านอาหารให้บริการ
      พร้อมลานจอดรถกว้างขวางสะดวกสบาย
      กางเต็นท์พักที่นี่แล้วยังสามารถขับรถไปเที่ยวไร่สตอรว์เบอร์รี่-ไร่ชา
      และสวนดอกไม้ในสถานีเกษตรหลวงอ่างขางที่อยู่ใกล้ๆ ได้อีกด้วย
    </p>
  </div>


</template>

<style scoped></style>
