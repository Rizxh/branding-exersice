import { Inter } from "next/font/google";
import {
  Box,
  Input,
  Heading,
  SimpleGrid,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  GridItem,
  useToast,
  Divider,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { fetchWrapper } from "helpers";
import { useRouter } from "next/router";
import FileUploadDropzone from "@/components/dropzone";
import VideoUploadDropzone from "@/components/dropzone-mp4";
import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'

const inter = Inter({ subsets: ["latin"] });

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

export default function Home() {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  // const quillStyles = {
  //   '.ql-editor': {
  //        fontFamily: 'Arial, sans-serif',
  //        fontSize: '16px',
  //        color: '#333',
  //        },
  //    // Add more custom styles as needed
  //     };
  
  //     quillInstance.root.style.cssText = quillStyles['.ql-editor']

  // Banner
  const [banners, setBanners] = useState([]);

  // Solutions
  const [solutions, setSolutions] = useState({
    stitle: "",
    sdescription: "",
    subSections: [],
  });
  const [solutionsTitle, setSolutionsTitle] = useState(null);
  const [solutionsDescription, setSolutionDescription] = useState(null);
  const [solutionsLogos, setSolutionsLogos] = useState([]);

  const fetchDataSolutionsLogos = async () => {
    try {
      await fetchWrapper.get("/api/solutions/get-label?logo=1").then((res) => {
        if (res.success) {
          setSolutionsLogos(res.data);
        } else {
          toast({
            title: "Error fetching solutions logos",
            description: res.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  const fetchDataSolutions = async () => {
    try {
      await fetchWrapper.get("/api/solutions/get-label").then((res) => {
        if (res.success) {
          const { stitle, sdescription, subSections } = res.data;
          setSolutions({
            stitle,
            sdescription,
            subSections: subSections || [],
          });
          // Set solutionsTitle dan solutionsDescription
          setSolutionsTitle(stitle);
          setSolutionDescription(sdescription);
        } else {
          toast({
            title: "Error fetching solutions data",
            description: res.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  // Products
  const [products, setProducts] = useState({
    stitle: "",
    sdescription: "",
    subSections: [],
  });
  const [productsAsset, setProductsAsset] = useState([]);
  const [productsTitle, setProductsTitle] = useState(null);
  const [productsDescription, setProductsDescription] = useState(null);

  const fetchDataProductsAsset = async () => {
    try {
      await fetchWrapper.get("/api/product/get-label?asset=1").then((res) => {
        if (res.success) {
          setProductsAsset(res.data);
        } else {
          toast({
            title: "Error fetching product assets",
            description: res.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      console.log("no products asset");
    }
  };

  const fetchDataProducts = async () => {
    try {
      await fetchWrapper.get("/api/product/get-label").then((res) => {
        if (res.success) {
          const { stitle, sdescription, subSections } = res.data;
          setProducts({
            stitle,
            sdescription,
            subSections: subSections || [],
          });
          setProductsTitle(stitle);
          setProductsDescription(sdescription);
        } else {
          toast({
            title: "Error fetching product data",
            description: res.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      console.log("no products data");
    }
  };

  // Video Pages
  const [videopages, setVideopages] = useState([]);
  const [videopagesAsset, setVideopagesAsset] = useState([]);

  const fetchDataVideoPage = async () => {
    try {
      await fetchWrapper.get("/api/videopage/get-label").then((res) => {
        if (res.success) {
          setVideopages(res.data);
          const assets = res.data.map((item) => item.asset);
          setVideopagesAsset(assets);
        } else {
          toast({
            title: "Error fetching video page data",
            description: res.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      console.log("no videopage data");
    }
  };

  // Technology Ecosystem
  const [technologys, setTechnologys] = useState({
    stitle: "",
    sdescription: "",
    subSections: [],
  });
  const [technologysAsset, setTechnologysAsset] = useState();
  const [technologysTitle, setTechnologysTitle] = useState(null);
  const [technologysDescription, setTechnologysDescription] = useState(null);

  const fetchDataTechnologiesAsset = async () => {
    try {
      await fetchWrapper
        .get("/api/technology/get-label?asset=1")
        .then((res) => {
          if (res.success) {
            setTechnologysAsset(res.data);
          } else {
            toast({
              title: "Error fetching technology picture",
              description: res.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    } catch (error) {
      console.log('no technologies asset');
    }
  };

  const fetchDataTechnologies = async () => {
    try {
      // get data technologies
      await fetchWrapper.get("/api/technology/get-label").then((res) => {
        // Set technologies
        if (res.success) {
          const { stitle, sdescription, subSections } = res.data;
          setTechnologys({
            stitle,
            sdescription,
            subSections: subSections || [],
          }); // set default Value from get process
          setTechnologysTitle(stitle);
          setTechnologysDescription(sdescription);
        } else {
          toast({
            title: "Error fetching technology data",
            description: res.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      console.log('no technologies data');
    }
  };

  // Articles
  const [articles, setArticles] = useState({
    stitle: "",
    sdescription: "",
    subSections: [],
  });
  const [articlesTitle, setArticlesTitle] = useState(null);
  const [articlesDescription, setArticlesDescription] = useState(null);
  const [articlesAsset, setArticlesAsset] = useState([]);

  const fetchDataArticlesAsset = async () => {
    try {
      await fetchWrapper
        .get("/api/article/get-label?asset=1")
        .then((res) => {
          if (res.success) {
            setArticlesAsset(res.data);
          } else {
            toast({
              title: "Error fetching article picture",
              description: res.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    } catch (error) {
      console.log('no articles asset');
    }
  };

  const fetchDataArticles = async () => {
    try {
      await fetchWrapper.get("/api/article/get-label").then((res) => {
        if (res.success) {
          const { stitle, sdescription, subSections } = res.data;
          setArticles({
            stitle,
            sdescription,
            subSections: subSections || [],
          });
          setArticlesTitle(stitle);
          setArticlesDescription(sdescription);
        } else {
          toast({
            title: "Error fetching article data",
            description: res.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      console.log('no articles data');
    }
  };

  // Bottoms
  const [bottoms, setBottoms] = useState([]);
  const [bottomTitle, setBottomTitle] = useState(null);
  const [bottomDescription, setBottomDescription] = useState(null);
  const [errorTooltip, setErrorTooltip] = useState(false);

  const fetchDataBottoms = async () => {
    try {
      await fetchWrapper.get("/api/bottom/get-label").then((res) => {
        if (res.success) {
          const { stitle, sdescription, subSections } = res.data;
          setBottoms({
            stitle,
            sdescription,
            subSections: subSections || [],
          });
          setBottomTitle(stitle);
          setBottomDescription(sdescription);
        } else {
          toast({
            title: "Error fetching section data",
            description: res.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
    } catch (error) {
      console.log('no section data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await fetchWrapper.get("/api/banner/get-label");

        // Set banners
        if (bannerResponse.success) {
          setBanners(bannerResponse.data);
        } else {
          toast({
            title: "Error fetching banner data",
            description: bannerResponse.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }

        // Set Solutions
        fetchDataSolutions();
        fetchDataSolutionsLogos();

        // Set products
        fetchDataProducts();
        fetchDataProductsAsset();

        // Set video pages
        fetchDataVideoPage();

        // Set technologies
        fetchDataTechnologies();
        fetchDataTechnologiesAsset();

        // Set articles
        fetchDataArticles();
        fetchDataArticlesAsset();

        // Set bottoms
        fetchDataBottoms();

      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleBannerSaveClicked = (index) => {
    const banner = banners[index];
    if (banner.id && banner.logo && banner.title && banner.description) { 
      const formData = new FormData();
      formData.append("id", banner.id);
      formData.append("title", banner.title);
      formData.append("descri ption", banner.description);
      formData.append("logo", banner.logo);

      fetchWrapper
        .postForm("/api/banner/update-label", formData)
        .then((res) => {
          const inputDataToast = "input-data-toast";
          if (res.success) {
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: "Banner Updated.",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top",
              });
            }
            setTimeout(() => router.reload(), 1500);
          } else {
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: res.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
          }
        });
    } else {
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  const handleSolutionSaveClicked = () => {
    setIsLoading(true);
    console.log("new Title => " + solutionsTitle);
    console.log("new Description => " + solutionsDescription);
    console.log("new Subsections => " + solutions.subSections);
    if (solutionsTitle && solutions.subSections) {
      const formData = new FormData();
      formData.append("stitle", solutionsTitle);
      formData.append("sdescription", solutionsDescription);
      formData.append("subSections", JSON.stringify(solutions.subSections));

      solutionsLogos.forEach((logo) => {
        if (logo == null || typeof logo == "string") {
          logo = new Blob([logo], { type: "text/plain" });
        }
        formData.append("logo[]", logo);
        console.log(logo);
      });

      fetchWrapper
        .postForm("/api/solutions/update-label", formData)
        .then((res) => {
          const inputDataToast = "input-data-toast-solution";
          if (res.success) {
            setIsLoading(false);
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: "Solutions Updated.",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top",
              });
            }
            // setTimeout(() => router.reload(), 1500);
          } else {
            setIsLoading(false);
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: res.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
          }
        });
    } else {
      setIsLoading(false);
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  const handleProductSaveClicked = () => {
    setIsLoading(true);
    console.log("new Title => " + productsTitle);
    console.log("new Description => " + productsDescription);
    console.log("new Subsections => " + products.subSections);
    if (productsTitle && products.subSections) {
      const formData = new FormData();
      formData.append("stitle", productsTitle);
      formData.append("sdescription", productsDescription);
      formData.append("subSections", JSON.stringify(products.subSections));

      productsAsset.forEach((asset) => {
        if (asset == null || typeof asset == "string") {
          asset = new Blob([asset], { type: "text/plain" });
        }
        formData.append("asset[]", asset);
        console.log(asset);
      });

      fetchWrapper
        .postForm("/api/product/update-label", formData)
        .then((res) => {
          const inputDataToast = "input-data-toast-product";
          if (res.success) {
            setIsLoading(false);
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: "Products Updated.",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top",
              });
            }
            console.log(res.data);
            // setTimeout(() => router.reload(), 1500);
          } else {
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: res.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
          }
        });
    } else {
      console.log("error if else");
      setIsLoading(false);
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  const handleVideopageSaveClicked = () => {
    console.log(JSON.stringify(videopages));
    console.log(JSON.stringify(videopagesAsset));
    setIsLoading(true);
    if (videopages) {
      const formData = new FormData();
      formData.append("subSections", JSON.stringify(videopages));

      videopagesAsset.forEach((asset) => {
        if (asset == null || typeof asset == "string") {
          asset = new Blob([asset], { type: "text/plain" });
        }
        formData.append("asset[]", asset);
      });

      fetchWrapper
        .postForm("/api/videopage/update-label", formData)
        .then((res) => {
          const inputDataToast = "input-data-toast-solution";
          if (res.success) {
            setIsLoading(false);
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: "Video Page Updated.",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top",
              });
            }
            // console.log(res.data);
            // setTimeout(() => router.reload(), 1500);
          } else {
            setIsLoading(false);
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: res.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
          }
        });
    } else {
      setIsLoading(false);
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  const handleTechnologySaveClicked = () => {
    setIsLoading(true)
    console.log("new Title => " + technologysTitle);
    console.log("new Description => " + technologysDescription);
    console.log("new Subsections => " + technologys.subSections);
    if (technologysTitle && technologys.subSections) {
      const formData = new FormData();
      formData.append("stitle", technologysTitle);
      formData.append("sdescription", technologysDescription);
      formData.append("subSections", JSON.stringify(technologys.subSections));

      technologysAsset.forEach((asset) => {
        if (asset == null || typeof asset == 'string') {
          asset = new Blob([asset], { type: 'text/plain' })
        }
        formData.append("asset[]", asset);
        console.log(asset);
      });

      fetchWrapper
        .postForm("/api/technology/update-label", formData)
        .then((res) => {
          const inputDataToast = "input-data-toast-solution";
          if (res.success) {
            setIsLoading(false)
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: "Technology Ecosystem Updated.",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top",
              });
            }
            console.log(res.data);
            // setTimeout(() => router.reload(), 1500);
          } else {
            setIsLoading(false)
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: res.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
          }
        });
    } else {
      console.log("error if else");
      setIsLoading(false)
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  const handleArticleSaveClicked = () => {
    setIsLoading(true);
    if (articlesTitle && articles.subSections) {
      const formData = new FormData();
      formData.append("stitle", articlesTitle);
      formData.append("sdescription", articlesDescription);
      formData.append("subSections", JSON.stringify(articles.subSections));

      articlesAsset.forEach((asset) => {
        if (asset == null || typeof asset == "string") {
          asset = new Blob([asset], { type: "text/plain" });
        }
        formData.append("asset[]", asset);
        console.log(asset);
      });

      fetchWrapper
        .postForm("/api/article/update-label", formData)
        .then((res) => {
          const inputDataToast = "input-data-toast-solution";
          if (res.success) {
            setIsLoading(false);
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: "Articles Updated.",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top",
              });
            }
            console.log(res.data);
            // setTimeout(() => router.reload(), 1500);
          } else {
            setIsLoading(false);
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: res.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
          }
        });
    } else {
      console.log("error");
      setIsLoading(false);
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  const handleBottomSaveClicked = () => {
    setIsLoading(true);
    if (bottomTitle) {
      const formData = new FormData();
      formData.append("stitle", bottomTitle);
      formData.append("sdescription", bottomDescription);
      formData.append("subSections", JSON.stringify(bottoms.subSections));

      fetchWrapper
        .postForm("/api/bottom/update-label", formData)
        .then((res) => {
          const inputDataToast = "input-data-toast-product";
          if (res.success) {
            setIsLoading(false);
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: "Bottom Section Updated.",
                status: "success",
                duration: 1500,
                isClosable: true,
                position: "top",
              });
            }
            console.log(res.data);
            // setTimeout(() => router.reload(), 1500);
          } else {
            if (!toast.isActive(inputDataToast)) {
              toast({
                id: inputDataToast,
                title: res.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
            }
          }
        });
    } else {
      console.log("error");
      setIsLoading(false);
      setErrorTooltip(true);
      setTimeout(() => setErrorTooltip(false), 3000);
    }
  };

  // Input Change Handler
  const handleInputChange = (index, field, value) => {
    const newBanners = [...banners];
    newBanners[index][field] = value;
    setBanners(newBanners);
  };

  const handleSolutionInputChange = (index, field, value) => {
    const newSubSections = [...solutions.subSections];
    newSubSections[index] = {
      ...newSubSections[index],
      [field]: value,
    };

    setSolutions((prevSolutions) => ({
      ...prevSolutions,
      subSections: newSubSections,
    }));
  };

  const handleProductInputChange = (index, field, value) => {
    const newSubSections = [...products.subSections];
    newSubSections[index] = {
      ...newSubSections[index],
      [field]: value,
    };

    setProducts((prevProducts) => ({
      ...prevProducts,
      subSections: newSubSections,
    }));
  };

  const handleVideopageInputChange = (index, field, value) => {
    const newVideopages = [...videopages];
    newVideopages[index][field] = value;
    setVideopages(newVideopages);
  };

  const handleTechnologyInputChange = (index, field, value) => {
    const newSubSections = [...technologys.subSections];
    newSubSections[index] = {
      ...newSubSections[index],
      [field]: value,
    };

    setTechnologys((prevTechnologys) => ({
      ...prevTechnologys,
      subSections: newSubSections,
    }));
  };

  const handleArticleInputChange = (index, field, value) => {
    setArticles((prevArticles) => {
      const newSubSections = [...prevArticles.subSections];
      newSubSections[index] = {
        ...newSubSections[index],
        [field]: value,
      };

      return {
        ...prevArticles,
        subSections: newSubSections,
      };
    });
  };

  const handleBottomInputChange = (index, field, value) => {
    const newSubSections = [...bottoms.subSections];
    newSubSections[index] = {
      ...newSubSections[index],
      [field]: value,
    };

    setBottoms((prevBottoms) => ({
      ...prevBottoms,
      subSections: newSubSections,
    }));
  };

  // File Input Field
  const handleFileUpload = (index, fileData) => {
    const newBanners = [...banners];
    newBanners[index].logo = fileData;
    setBanners(newBanners);
  };

  const handleSolutionFileUpload = (index, fileData) => {
    const newSolutionsLogos = [...solutionsLogos];
    newSolutionsLogos[index] = fileData;
    setSolutionsLogos(newSolutionsLogos);
  };

  const handleProductFileUpload = (index, fileData) => {
    const newProductsAsset = [...productsAsset];
    newProductsAsset[index] = fileData;
    setProductsAsset(newProductsAsset);
  };

  const handleVideopageFileUpload = (index, fileData) => {
    const newVideopagesAsset = [...videopagesAsset];
    newVideopagesAsset[index] = fileData;
    setVideopagesAsset(newVideopagesAsset);
  };


  const handleTechnologyFileUpload = async (index, fileData) => {
    const newTechnologyAsset = [...technologysAsset];
    newTechnologyAsset[index] = fileData;
    setTechnologysAsset(newTechnologyAsset);
  };

  const handleArticleFileUpload = (index, fileData) => {
    const newArticlesAsset = [...articlesAsset];
    newArticlesAsset[index] = fileData;
    setArticlesAsset(newArticlesAsset);
  };

  // Add data functions
  const addSolutionsRow = () => {
    const newSubSection = {
      id: solutions.subSections.length + 1,
      logo: null,
      title: null,
      description: null,
    };

    setSolutions((prevSolutions) => ({
      ...prevSolutions,
      subSections: [...prevSolutions.subSections, newSubSection],
    }));
    setSolutionsLogos([...solutionsLogos, newSubSection.logo]);
  };

  const addProductsRow = () => {
    const newSubSection = {
      id: products.subSections.length + 1,
      asset: null,
      title: null,
      link: null,
    };

    setProducts((prevProducts) => ({
      ...prevProducts,
      subSections: [...prevProducts.subSections, newSubSection],
    }));
    setProductsAsset([...productsAsset, newSubSection.asset]);
  };

  const addVideoPagesRow = () => {
    const newVideo = {
      id: videopages.length + 1,
      asset: null,
      title: null,
      description: null,
      button: null,
      link: null,
    };

    setVideopages([...videopages, newVideo]);
    setVideopagesAsset([...videopagesAsset, newVideo.asset]);
  };

  const addTechnoRow = () => {
    const newSubSection = {
      id: technologys.subSections.length + 1,
      asset: null,
      description: null,
      link: null,
    };

    setTechnologys((prevTechnologys) => ({
      ...prevTechnologys,
      subSections: [...prevTechnologys.subSections, newSubSection],
    }));
    setTechnologysAsset([...technologysAsset, newSubSection.asset])
  };

  const addArticlesRow = () => {
    const newSubSection = {
      id: articles.subSections.length + 1,
      asset: null,
      title: null,
      link: null,
      excerpts: null,
    };

    setArticles((prevArticles) => ({
      ...prevArticles,
      subSections: [...prevArticles.subSections, newSubSection],
    }));
    setArticlesAsset([...articlesAsset, newSubSection.asset]);
  };

  const addBottomsRow = () => {
    const newSubSection = {
      id: bottoms.subSections.length + 1,
      section: "",
      button: "",
      link: "",
    };

    setBottoms((prevBottoms) => ({
      ...prevBottoms,
      subSections: [...prevBottoms.subSections, newSubSection],
    }));
  };

  return (
    <VStack
      p={{ base: "4", xl: "8" }}
      align="stretch"
      minH="100vh"
      gap="5"
      spacing={4}
    >
      {/* Heading Link */}
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Branding</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Home Button */}
      <HStack justifyContent="space-between" pt={4} pb={4}>
        <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
          Home
        </Heading>
      </HStack>

      {/* Banner Label */}
      <Box bg="white" rounded={6} p={6}>
        {banners.map((banner, index) => (
          <VStack key={index} gap={6}>
            <HStack justifyContent={"space-between"} w="100%">
              <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
                Manage Banner Section
              </Heading>
              <Button
                size={{ base: "sm", lg: "md", xl: "md" }}
                variant="solid"
                backgroundColor="#1167B1"
                rounded="13"
                color="white"
                p="2"
                _hover={{
                  backgroundColor: "#0e4f8a",
                  color: "white",
                }}
                onClick={() => handleBannerSaveClicked(index)}
              >
                SAVE
              </Button>
            </HStack>
            <VStack pt={6} w="100%" gap="6">
              <SimpleGrid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  sm: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={6}
                w="100%"
              >
                <FormControl
                  id={`bannerLogo-${index}`}
                  isInvalid={!banner.logo && errorTooltip}
                  isRequired
                >
                  <FormLabel>Logo</FormLabel>
                  <FileUploadDropzone
                    id={`bannerLogo-${index}`}
                    value={banner.logo}
                    onFileUploaded={(fileData) =>
                      handleFileUpload(index, fileData)
                    }
                  />
                  <FormErrorMessage>Enter Logo!</FormErrorMessage>
                </FormControl>
                <FormControl
                  id={`bannerTitle-${index}`}
                  isInvalid={!banner.title && errorTooltip}
                  isRequired
                >
                  <FormLabel>Title</FormLabel>
                  <Textarea
                    value={banner.title}
                    placeholder="Digital Display Content Management ..."
                    onChange={(event) =>
                      handleInputChange(index, "title", event.target.value)
                    }
                  />
                  <FormErrorMessage>Enter Title!</FormErrorMessage>
                </FormControl>
                <FormControl
                  id={`bannerDescription-${index}`}
                  isInvalid={!banner.description && errorTooltip}
                  isRequired
                >
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={banner.description}
                    placeholder="A system that allows businesses to ..."
                    onChange={(event) =>
                      handleInputChange(
                        index,
                        "description",
                        event.target.value
                      )
                    }
                  />
                  <FormErrorMessage>Enter Description!</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
            </VStack>
          </VStack>
        ))}
      </Box>

      {/* Solutions Section */}
      <Box bg="white" rounded={6} p={6} mt={6}>
        {/* Head Button */}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Solution Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
              onClick={addSolutionsRow}
            >
              ADD
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={"SUBMITING..."}
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a",
                color: "white",
              }}
              onClick={() => handleSolutionSaveClicked()}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <VStack pt={6} w="100%" gap={6}>
          <SimpleGrid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
            w="100%"
          >
            <FormControl
              id={`solutionsTitle`}
              isInvalid={!solutionsTitle && errorTooltip}
              isRequired
            >
              <FormLabel>Section Title</FormLabel>
              <Input
                value={solutionsTitle}
                placeholder="Solutions"
                onChange={(event) => setSolutionsTitle(event.target.value)}
              />
            </FormControl>
            <GridItem colSpan={2}>
              <VStack>
                <FormControl
                  id={`solutionDescription`}
                  isInvalid={!solutionsDescription && errorTooltip}
                >
                  <FormLabel>Section Description</FormLabel>
                  <Input
                    value={solutionsDescription}
                    placeholder="Enter section description "
                    onChange={(event) =>
                      setSolutionDescription(event.target.value || "")
                    }
                  />
                </FormControl>
              </VStack>
            </GridItem>
          </SimpleGrid>
        </VStack>

        {solutions?.subSections?.map((subsection, index) => (
          <SimpleGrid key={index} gap={6}>
            {/* Solution Items */}
            <VStack gap={6}>
              <VStack pt={6} w="100%" gap={6}>
                <SimpleGrid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={6}
                  w="100%"
                >
                  <FormControl
                    id={`solutionsLogos-${index}`}
                    isInvalid={!solutionsLogos[index] && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Logo</FormLabel>
                    <FileUploadDropzone
                      value={solutionsLogos[index]}
                      onFileUploaded={(fileData) =>
                        handleSolutionFileUpload(index, fileData)
                      }
                    />
                    <FormErrorMessage>Enter Logo!</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id={`solutionTitle-${index}`}
                    isInvalid={!subsection.title && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={subsection.title}
                      placeholder="AI-powered Audience Analytics"
                      onChange={(event) =>
                        handleSolutionInputChange(
                          index,
                          "title",
                          event.target.value
                        )
                      }
                    />
                    <FormErrorMessage>Enter Title!</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id={`solutionDescription-${index}`}
                    isInvalid={!subsection.description && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={subsection.description}
                      placeholder="This solution uses artificial ..."
                      onChange={(event) =>
                        handleSolutionInputChange(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                    />
                    <FormErrorMessage>Enter Description!</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </VStack>
            </VStack>
          </SimpleGrid>
        ))}
      </Box>

      {/* Products */}
      <Box bg="white" rounded={6} p={6} mt={6}>
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Products Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
              onClick={addProductsRow}
            >
              ADD
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={'SUBMITING...'}
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
              onClick={() => handleProductSaveClicked()}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <VStack gap={6}>
          <VStack pt={6} w="100%" gap="6">
            <SimpleGrid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
              w="100%"
            >
              <FormControl
                id={`productsSectionTitle`}
                isInvalid={!productsTitle && errorTooltip}
                isRequired
              >
                <FormLabel>Section Title</FormLabel>
                <Input
                  value={productsTitle}
                  placeholder="Products"
                  onChange={(event) => setProductsTitle(event.target.value)}
                />
                <FormErrorMessage>Enter Section Title!</FormErrorMessage>
              </FormControl>
              <GridItem colSpan={2}>
                <VStack>
                  <FormControl
                    id={`productsSectionDescription`}
                    isInvalid={!productsDescription && errorTooltip}
                  >
                    <FormLabel>Section Description</FormLabel>
                    <Input
                      value={productsDescription}
                      placeholder="Enter section description "
                      onChange={(event) =>
                        setProductsDescription(event.target.value)
                      }
                    />
                  </FormControl>
                </VStack>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </VStack>

        {products?.subSections?.map((subsection, index) => (
          <SimpleGrid key={index} gap={6}>
            <VStack gap={6}>
              <VStack pt={6} w="100%" gap="6">
                <SimpleGrid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={6}
                  w="100%"
                >
                  <FormControl
                    id={`productAsset`}
                    isInvalid={!productsAsset[index] && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Asset</FormLabel>
                    <FileUploadDropzone
                      id={`productAsset`}
                      value={productsAsset[index]}
                      onFileUploaded={(fileData) =>
                        handleProductFileUpload(index, fileData)
                      }
                    />

                    <FormErrorMessage>Enter Asset!</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id={`productTitle-${index}`}
                    isInvalid={!subsection.title && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={subsection.title}
                      placeholder="Xion1"
                      onChange={(event) =>
                        handleProductInputChange(
                          index,
                          "title",
                          event.target.value
                        )
                      }
                    />
                    <FormErrorMessage>Enter Title!</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id={`productLink-${index}`}
                    isInvalid={!subsection.link && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Link</FormLabel>
                    <Input
                      value={subsection.link}
                      placeholder="https://xion1.com/productXion"
                      onChange={(event) =>
                        handleProductInputChange(
                          index,
                          "link",
                          event.target.value
                        )
                      }
                    />
                    <FormErrorMessage>Enter Link!</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </VStack>
            </VStack>
          </SimpleGrid>
        ))}
      </Box>

      {/* Video page */}
      <Box bg="white" rounded={6} p={6} mt={6}>
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Video Pages Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
              onClick={addVideoPagesRow}
            >
              ADD
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={"SUBMITING..."}
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
              onClick={() => handleVideopageSaveClicked()}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        {videopages?.map((videopage, index) => (
          <SimpleGrid key={index} gap={6}>
            <VStack gap={6}>
              <VStack pt={6} w="100%" gap="6">
                <SimpleGrid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={6}
                  w="100%"
                >
                  <FormControl
                    id={`videopageAsset`}
                    isInvalid={!videopagesAsset[index] && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Asset</FormLabel>
                    <VideoUploadDropzone
                      id={`videopagetAsset`}
                      value={videopagesAsset[index]}
                      onFileUploaded={(fileData) =>
                        handleVideopageFileUpload(index, fileData)
                      }
                    />
                    <FormErrorMessage>Enter Asset!</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id={`videopageTitle`}
                    isInvalid={!videopage.title && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Title</FormLabel>
                    <Textarea
                      value={videopage.title}
                      placeholder="One platform for every marketing ..."
                      onChange={(event) =>
                        handleVideopageInputChange(
                          index,
                          "title",
                          event.target.value
                        )
                      }
                    />
                    <FormErrorMessage>Enter Title!</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id={`videopageDescription`}
                    isInvalid={!videopage.description && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={videopage.description}
                      placeholder="We empower businesses with ..."
                      onChange={(event) =>
                        handleVideopageInputChange(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                    />
                    <FormErrorMessage>Enter Description!</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </VStack>
            </VStack>

            <VStack gap={6}>
              <VStack pt={6} w="100%" gap="6">
                <SimpleGrid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={6}
                  w="100%"
                >
                  <FormControl
                    id={`videopageButton`}
                    isInvalid={!videopage.button && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Button</FormLabel>
                    <Input
                      value={videopage.button}
                      placeholder="Get Started"
                      onChange={(event) =>
                        handleVideopageInputChange(
                          index,
                          "button",
                          event.target.value
                        )
                      }
                    />

                    <FormErrorMessage>Enter Button!</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id={`videopageLink`}
                    isInvalid={!videopage.link && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Link</FormLabel>
                    <Input
                      value={videopage.link}
                      placeholder="https://xion1.com"
                      onChange={(event) =>
                        handleVideopageInputChange(
                          index,
                          "link",
                          event.target.value
                        )
                      }
                    />
                    <FormErrorMessage>Enter Link!</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
              </VStack>
            </VStack>
          </SimpleGrid>
        ))}
      </Box>

      {/* Technology Ecosystem*/}
      <Box bg="white" rounded={6} p={6} mt={6}>
        {/* Head Button*/}
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Technology Ecosystem Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
              onClick={addTechnoRow}
            >
              ADD
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={'SUBMITING...'}
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a", // warna latar belakang saat hover
                color: "white", // warna teks saat hover
              }}
              onClick={() => handleTechnologySaveClicked()}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <VStack gap={6}>
          <VStack pt={6} w="100%" gap="6">
            <SimpleGrid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
              w="100%"
            >
              <FormControl
                id={`technologysSectionTitle`}
                isInvalid={!technologysTitle && errorTooltip}
                isRequired
              >
                <FormLabel>Section Title</FormLabel>
                <Input
                  value={technologysTitle}
                  placeholder="Technology Ecosystem"
                  onChange={(event) => setTechnologysTitle(event.target.value)}
                />
                <FormErrorMessage>Enter Section Title!</FormErrorMessage>
              </FormControl>
              <GridItem colSpan={2}>
                <VStack>
                  <FormControl
                    id={`technologysSectionDescription`}
                    isInvalid={!technologysDescription && errorTooltip}
                  >
                    <FormLabel>Section Description</FormLabel>
                    <Input
                      value={technologysDescription}
                      placeholder="Enter section description"
                      w="100%"
                      onChange={(event) =>
                        setTechnologysDescription(event.target.value)
                      }
                    />
                  </FormControl>
                </VStack>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </VStack>

        {technologys?.subSections?.map((subsection, index) => (
          <SimpleGrid key={index} gap={6}>
            <VStack gap={6}>
              <VStack pt={6} w="100%" gap="6">
                <SimpleGrid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={6}
                  w="100%"
                >
                  <FormControl
                    id={`technologysAsset`}
                    isInvalid={!technologysAsset[index] && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Asset</FormLabel>
                    <FileUploadDropzone
                      id={`technologysAsset`}
                      value={technologysAsset[index]}
                      onFileUploaded={(fileData) =>
                        handleTechnologyFileUpload(index, fileData)
                      }
                    />
                  </FormControl>
                  <FormControl
                    id={`technologyDescription-${index}`}
                    isInvalid={!subsection.description && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={subsection.description}
                      placeholder="Enterprise-ready AI-powered Virtual Beings"
                      onChange={(event) =>
                        handleTechnologyInputChange(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                    />
                  </FormControl>
                  <FormControl
                    id={`technologyLink-${index}`}
                    isInvalid={!subsection.link && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Link</FormLabel>
                    <Input
                      value={subsection.link}
                      placeholder="Enterprise-ready AI-powered Virtual Beings"
                      onChange={(event) =>
                        handleTechnologyInputChange(
                          index,
                          "link",
                          event.target.value
                        )
                      }
                    />
                  </FormControl>
                </SimpleGrid>
              </VStack>
            </VStack>
          </SimpleGrid>
        ))}
      </Box>

      {/* Articles */}
      <Box bg="white" rounded={6} p={6} mt={6}>
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Articles Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
              onClick={addArticlesRow}
            >
              ADD
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={"SUBMITING..."}
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a",
                color: "white",
              }}
              onClick={handleArticleSaveClicked}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>

        <VStack gap={6}>
          <VStack pt={6} w="100%" gap="6">
            <SimpleGrid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
              w="100%"
            >
              <FormControl
                id="articlesSectionTitle"
                isInvalid={!articlesTitle && errorTooltip}
                isRequired
              >
                <FormLabel>Section Title</FormLabel>
                <Input
                  value={articlesTitle}
                  placeholder="Articles"
                  onChange={(event) => setArticlesTitle(event.target.value)}
                />
              </FormControl>
              <GridItem colSpan={2}>
                <VStack>
                  <FormControl
                    id="articlesSectionDescription"
                    isInvalid={!articlesDescription && errorTooltip}
                  >
                    <FormLabel>Section Description</FormLabel>
                    <Input
                      value={articlesDescription}
                      placeholder="Enter section description"
                      onChange={(event) =>
                        setArticlesDescription(event.target.value)
                      }
                    />
                  </FormControl>
                </VStack>
              </GridItem>
            </SimpleGrid>
          </VStack>
        </VStack>
        <br/>
        <Divider bg="#CCCCCC" />
        {articles?.subSections?.map((subsection, index) => (

          <SimpleGrid key={index} gap={6}>
            <VStack gap={6}>
              <VStack pt={6} w="100%" gap="6">
                <SimpleGrid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={6}
                  w="100%"
                >
                  <FormControl
                    id={`articlesAsset-${index}`}
                    isInvalid={!articlesAsset[index] && errorTooltip}
                    isRequired
                  >
                    <FormLabel>Asset</FormLabel>
                    <FileUploadDropzone
                      id={`articlesAsset-${index}`}
                      value={articlesAsset[index]}
                      onFileUploaded={(fileData) =>
                        handleArticleFileUpload(index, fileData)
                      }
                    />
                    {/* <FormErrorMessage>Enter Asset!</FormErrorMessage> */}
                  </FormControl>
                  <GridItem colSpan={2}>
                    <FormControl
                      id={`articlesTitle-${index}`}
                      isInvalid={!subsection.title && errorTooltip}
                      isRequired
                    >
                      <FormLabel>Title</FormLabel>
                      <Input
                        value={subsection.title}
                        placeholder="Digital Signage Outlook 2024: ... "
                        onChange={(event) =>
                          handleArticleInputChange(
                            index,
                            "title",
                            event.target.value
                          )
                        }
                      />
                      <FormErrorMessage>Enter Title!</FormErrorMessage>
                    </FormControl>
                    <br />
                    <FormControl
                      id={`articlesLink-${index}`}
                      isInvalid={!subsection.link && errorTooltip}
                      isRequired
                    >
                      <FormLabel>Article Link</FormLabel>
                      <Input
                        value={subsection.link}
                        placeholder="https://xion1.com/article-01"
                        onChange={(event) =>
                          handleArticleInputChange(
                            index,
                            "link",
                            event.target.value
                          )
                        }
                      />
                      <FormErrorMessage>Enter Article Link!</FormErrorMessage>
                    </FormControl>
                    <br />
                    <FormControl
                      id={`articlesExcerpts-${index}`}
                      isInvalid={!subsection.excerpts && errorTooltip}
                      isRequired
                      style={{ height: 200 }}
                    >
                      <FormLabel>Excerpts</FormLabel>
                      <QuillNoSSRWrapper theme="snow"
                        value={subsection.excerpts}
                        placeholder="As we transition from 2023, it's ... "
                        onChange={(value) =>
                          handleArticleInputChange(
                            index,
                            "excerpts",
                            value
                          )
                        }
                        style={{height: 120, borderRadius: 100}}
                        >
                      </QuillNoSSRWrapper>
                      <FormErrorMessage>Enter Excerpts!</FormErrorMessage>
                    </FormControl>
                  </GridItem>
                </SimpleGrid>
              </VStack>
            </VStack>
            <Divider bg="#CCCCCC" />
          </SimpleGrid>

        ))}
      </Box>

      {/* Bottom */}
      <Box bg="white" rounded={6} p={6} mt={6}>
        {/* Head Button */}
        <HStack justifyContent={"space-between"} w="100%">
          <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="500">
            Manage Bottom Section
          </Heading>
          <HStack>
            <Button
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              colorScheme="blue"
              rounded="13"
              p="2"
              leftIcon={<FaPlus />}
              onClick={addBottomsRow}
            >
              ADD
            </Button>
            <Button
              isLoading={isLoading}
              loadingText={"SUBMITING..."}
              size={{ base: "sm", lg: "md", xl: "md" }}
              variant="solid"
              backgroundColor="#1167B1"
              rounded="13"
              color="white"
              p="2"
              _hover={{
                backgroundColor: "#0e4f8a",
                color: "white",
              }}
              onClick={() => handleBottomSaveClicked()}
            >
              SAVE
            </Button>
          </HStack>
        </HStack>
        <VStack pt={6} w="100%" gap="6">
          <SimpleGrid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
            w="100%"
          >
            <FormControl
              id={`bottomTitle`}
              isInvalid={!bottomTitle && errorTooltip}
              isRequired
            >
              <FormLabel>Section Title</FormLabel>
              <Input
                value={bottomTitle}
                placeholder="Use our App Today & Experience Endless Possibilities."
                onChange={(event) => setBottomTitle(event.target.value)}
              />
              <FormErrorMessage>Enter Section Title!</FormErrorMessage>
            </FormControl>
            <GridItem colSpan={2}>
              <FormControl
                id={`bottomDescription`}
                isInvalid={!bottomDescription}
              >
                <FormLabel>Section Description</FormLabel>
                <Input
                  placeholder="Enter section description"
                  value={bottomDescription}
                  onChange={(e) => setBottomDescription(e.target.value)}
                />
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </VStack>
        {bottoms?.subSections?.map((subsection, index) => (
          <SimpleGrid key={index} gap={6}>
            <VStack pt={6} w="100%" gap="6">
              <SimpleGrid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  sm: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={6}
                w="100%"
              >
                <FormControl
                  id={`bottomSection-${index}`}
                  isInvalid={!subsection.section && errorTooltip}
                  isRequired
                >
                  <FormLabel>Section</FormLabel>
                  <Textarea
                    placeholder="Use Our App Today & Experience ..."
                    value={subsection.section}
                    onChange={(e) =>
                      handleBottomInputChange(index, "section", e.target.value)
                    }
                  />
                  <FormErrorMessage>Enter Section!</FormErrorMessage>
                </FormControl>
                <FormControl
                  id={`bottomButton-${index}`}
                  isInvalid={!subsection.button && errorTooltip}
                  isRequired
                >
                  <FormLabel>Button</FormLabel>
                  <Input
                    placeholder="Explore Platform"
                    value={subsection.button}
                    onChange={(e) =>
                      handleBottomInputChange(index, "button", e.target.value)
                    }
                  />
                  <FormErrorMessage>Enter Button!</FormErrorMessage>
                </FormControl>
                <FormControl
                  id={`bottomLink-${index}`}
                  isInvalid={!subsection.link && errorTooltip}
                  isRequired
                >
                  <FormLabel>Link</FormLabel>
                  <Input
                    placeholder="https://xion1.com"
                    value={subsection.link}
                    onChange={(e) =>
                      handleBottomInputChange(index, "link", e.target.value)
                    }
                  />
                  <FormErrorMessage>Enter Link!</FormErrorMessage>
                </FormControl>
              </SimpleGrid>
            </VStack>
          </SimpleGrid>
        ))}
      </Box>
    </VStack>
  );
}
