// 服裝資料 - 使用JSON格式
const clothingData = {
    "categories": [
        {
            "name": "01",
            "type": "hair",
            "required": false,
            "items": [
                { "id": "hair1", "name": "短髮", "image": "hair1.png" },
                { "id": "hair2", "name": "長髮", "image": "hair2.png" },
                { "id": "hair3", "name": "馬尾", "image": "hair3.png" },
                { "id": "hair4", "name": "捲髮", "image": "hair4.png" },
                { "id": "hair5", "name": "雙馬尾", "image": "hair5.png" },
                { "id": "hair6", "name": "公主頭", "image": "hair6.png" }
            ]
        },
        {
            "name": "02",
            "type": "top",
            "required": true,
            "items": [
                { "id": "top1", "name": "T恤", "image": "top1.png" },
                { "id": "top2", "name": "毛衣", "image": "top2.png" },
                { "id": "top3", "name": "洋裝", "image": "top3.png" },
                { "id": "top4", "name": "外套", "image": "top4.png" },
                { "id": "top5", "name": "襯衫", "image": "top5.png" },
                { "id": "top6", "name": "背心", "image": "top6.png" }
            ]
        },
        {
            "name": "03",
            "type": "bottom",
            "required": true,
            "items": [
                { "id": "bottom1", "name": "牛仔褲", "image": "bottom1.png" },
                { "id": "bottom2", "name": "短褲", "image": "bottom2.png" },
                { "id": "bottom3", "name": "裙子", "image": "bottom3.png" },
                { "id": "bottom4", "name": "運動褲", "image": "bottom4.png" },
                { "id": "bottom5", "name": "長裙", "image": "bottom5.png" },
                { "id": "bottom6", "name": "休閒褲", "image": "bottom6.png" }
            ]
        },
        {
            "name": "04",
            "type": "shoes",
            "required": false,
            "items": [
                { "id": "shoes1", "name": "運動鞋", "image": "shoes1.png" },
                { "id": "shoes2", "name": "皮鞋", "image": "shoes2.png" },
                { "id": "shoes3", "name": "高跟鞋", "image": "shoes3.png" },
                { "id": "shoes4", "name": "涼鞋", "image": "shoes4.png" },
                { "id": "shoes5", "name": "靴子", "image": "shoes5.png" },
                { "id": "shoes6", "name": "拖鞋", "image": "shoes6.png" }
            ]
        },
        {
            "name": "05",
            "type": "accessory",
            "required": false,
            "items": [
                { "id": "acc1", "name": "帽子", "image": "acc1.png" },
                { "id": "acc2", "name": "眼鏡", "image": "acc2.png" },
                { "id": "acc3", "name": "項鍊", "image": "acc3.png" },
                { "id": "acc4", "name": "包包", "image": "acc4.png" },
                { "id": "acc5", "name": "手錶", "image": "acc5.png" },
                { "id": "acc6", "name": "耳環", "image": "acc6.png" }
            ]
        }
    ]
};

// 當前選擇的服裝
let currentOutfit = {
    hair: null,
    top: null,
    bottom: null,
    shoes: null,
    accessory: null
};

// 當前選擇的分類
let currentCategory = 'hair';

// 初始化應用
function initApp() {
    // 為必填分類設置默認選擇
    setRequiredDefaults();

    renderCategories();
    renderItems(currentCategory);
    updateDoll();
    setupEventListeners();
}

// 為必填分類設置默認選擇
function setRequiredDefaults() {
    clothingData.categories.forEach(category => {
        if (category.required && category.items.length > 0 && !currentOutfit[category.type]) {
            currentOutfit[category.type] = category.items[0].id;
        }
    });
}

// 渲染分類
function renderCategories() {
    const categoriesContainer = document.querySelector('.categories');
    categoriesContainer.innerHTML = '';

    clothingData.categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = `category ${category.type === currentCategory ? 'active' : ''}`;
        categoryElement.dataset.type = category.type;
        categoryElement.textContent = category.name;
        categoryElement.addEventListener('click', handleCategoryClick);
        categoriesContainer.appendChild(categoryElement);
    });
}

// 處理分類點擊
function handleCategoryClick(e) {
    const type = e.target.dataset.type;
    currentCategory = type;

    // 更新UI
    renderCategories();
    renderItems(type);
}

// 渲染項目
function renderItems(categoryType) {
    const itemsContainer = document.querySelector('.items-container');
    itemsContainer.innerHTML = '';

    // 找到對應的分類
    const category = clothingData.categories.find(cat => cat.type === categoryType);
    if (!category) return;

    // 如果不是必填分類，添加"無"選項
    if (!category.required) {
        const noneItem = document.createElement('div');
        noneItem.className = `item ${currentOutfit[categoryType] === null ? 'selected' : ''}`;
        noneItem.dataset.type = categoryType;
        noneItem.dataset.id = 'none';
        noneItem.innerHTML = '<div class="placeholder">無</div>';
        noneItem.addEventListener('click', handleItemClick);
        itemsContainer.appendChild(noneItem);
    }

    // 添加該類別的所有項目
    category.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = `item ${currentOutfit[categoryType] === item.id ? 'selected' : ''}`;
        itemElement.dataset.type = categoryType;
        itemElement.dataset.id = item.id;

        // 使用圖片縮圖
        const img = document.createElement('img');
        img.className = 'item-image';
        // 使用佔位圖片，實際使用時請替換為真實圖片路徑
        img.src = `https://via.placeholder.com/80x80/f0f0f0/666666?text=${encodeURIComponent(item.name)}`;
        img.alt = item.name;

        itemElement.appendChild(img);
        itemElement.addEventListener('click', handleItemClick);
        itemsContainer.appendChild(itemElement);
    });
}

// 處理項目點擊
function handleItemClick(e) {
    const type = e.currentTarget.dataset.type;
    const id = e.currentTarget.dataset.id;

    // 更新當前選擇
    if (id === 'none') {
        currentOutfit[type] = null;
    } else {
        currentOutfit[type] = id;
    }

    // 更新UI
    renderItems(type);
    updateDoll();
}

// 更新紙娃娃顯示
function updateDoll() {
    const dollBase = document.querySelector('.doll-base');

    // 清除現有的服裝層
    document.querySelectorAll('.clothing-layer').forEach(layer => {
        layer.remove();
    });

    // 添加當前選擇的服裝
    Object.keys(currentOutfit).forEach(type => {
        const itemId = currentOutfit[type];
        if (itemId) {
            // 找到對應的服裝資料
            const category = clothingData.categories.find(cat => cat.type === type);
            if (category) {
                const item = category.items.find(it => it.id === itemId);
                if (item) {
                    const layer = document.createElement('div');
                    layer.className = 'clothing-layer';

                    const img = document.createElement('img');
                    img.className = 'clothing-item';
                    // 使用佔位圖片，實際使用時請替換為真實圖片路徑
                    img.src = `https://via.placeholder.com/180x300/f0f0f0/666666?text=${encodeURIComponent(item.name)}`;
                    img.alt = item.name;

                    layer.appendChild(img);
                    dollBase.appendChild(layer);
                }
            }
        }
    });
}

// 隨機搭配
function randomizeOutfit() {
    Object.keys(currentOutfit).forEach(type => {
        const category = clothingData.categories.find(cat => cat.type === type);
        if (category) {
            if (category.required) {
                // 必填分類：總是選擇一個項目
                const randomIndex = Math.floor(Math.random() * category.items.length);
                currentOutfit[type] = category.items[randomIndex].id;
            } else {
                // 非必填分類：80%機率選擇，20%機率不選擇
                const shouldSelect = Math.random() < 0.8;

                if (shouldSelect && category.items.length > 0) {
                    const randomIndex = Math.floor(Math.random() * category.items.length);
                    currentOutfit[type] = category.items[randomIndex].id;
                } else {
                    currentOutfit[type] = null;
                }
            }
        }
    });

    renderItems(currentCategory);
    updateDoll();
}

// 重置為初始狀態
function resetOutfit() {
    Object.keys(currentOutfit).forEach(type => {
        const category = clothingData.categories.find(cat => cat.type === type);
        if (category && category.required && category.items.length > 0) {
            // 必填分類：設置為第一個項目
            currentOutfit[type] = category.items[0].id;
        } else {
            // 非必填分類：設置為空
            currentOutfit[type] = null;
        }
    });

    renderItems(currentCategory);
    updateDoll();
}

// 顯示結果
function showResult() {
    // 檢查必填項目是否已選擇
    let missingRequired = [];
    clothingData.categories.forEach(category => {
        if (category.required && !currentOutfit[category.type]) {
            missingRequired.push(category.name);
        }
    });

    if (missingRequired.length > 0) {
        alert(`請先選擇以下必填項目：${missingRequired.join('、')}`);
        return;
    }

    // 生成結果字串
    let result = "紙娃娃搭配:";
    Object.keys(currentOutfit).forEach(type => {
        const itemId = currentOutfit[type];
        if (itemId) {
            const category = clothingData.categories.find(cat => cat.type === type);
            if (category) {
                const item = category.items.find(it => it.id === itemId);
                if (item) {
                    result += ` ${category.name}:${item.name}`;
                }
            }
        } else {
            const category = clothingData.categories.find(cat => cat.type === type);
            if (category && !category.required) {
                result += ` ${category.name}:無`;
            }
        }
    });

    // 顯示結果
    document.getElementById('resultText').textContent = result;
    document.getElementById('resultModal').style.display = 'flex';
}

// 複製結果
function copyResult() {
    const resultText = document.getElementById('resultText');
    const textArea = document.createElement('textarea');
    textArea.value = resultText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert('已複製到剪貼簿！');
}

// 設置事件監聽器
function setupEventListeners() {
    document.getElementById('randomBtn').addEventListener('click', randomizeOutfit);
    document.getElementById('resetBtn').addEventListener('click', resetOutfit);
    document.getElementById('completeBtn').addEventListener('click', showResult);
    document.getElementById('copyBtn').addEventListener('click', copyResult);
    document.getElementById('closeBtn').addEventListener('click', function () {
        document.getElementById('resultModal').style.display = 'none';
    });
}

// 初始化應用
document.addEventListener('DOMContentLoaded', initApp);